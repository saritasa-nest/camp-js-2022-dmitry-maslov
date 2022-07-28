import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PaginationParams } from '@js-camp/core/models/paginationParams';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeSortField } from '@js-camp/core/enums/anime/sort';
import { SortParams } from '@js-camp/angular/core/models/sortParams';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  first,
  map,
  Observable,
  share,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AnimeFilters } from '@js-camp/core/models/anime/animeFilters';

/** QueryParams for table. */
enum QueryParams {
  Limit = 'limit',
  Page = 'page',
  Search = 'search',
  SortBy = 'sortBy',
  Direction = 'direction',
  FiltersType = 'type',
}

const DEFAULT_QUERY_PARAMS = {
  [QueryParams.Limit]: 10,
  [QueryParams.Page]: 1,
  [QueryParams.Search]: null,
  [QueryParams.SortBy]: null,
  [QueryParams.Direction]: null,
  [QueryParams.FiltersType]: null,
};

const RESET_PAGINATION_PAGE = 1;

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  /** Sorted fields. */
  public readonly sortedFields = AnimeSortField;

  /** Methods that result in a readable model. */
  public readonly toReadable = {
    type: AnimeType.toReadable,
    status: AnimeStatus.toReadable,
  };

  /** Anime type options. */
  public readonly filterOptionsMap = {
    type: {
      [AnimeType.Movie]: this.toReadable.type(AnimeType.Movie),
      [AnimeType.TV]: this.toReadable.type(AnimeType.TV),
      [AnimeType.OVA]: this.toReadable.type(AnimeType.OVA),
      [AnimeType.ONA]: this.toReadable.type(AnimeType.ONA),
      [AnimeType.Special]: this.toReadable.type(AnimeType.Special),
      [AnimeType.Music]: this.toReadable.type(AnimeType.Music),
    },
  };

  /** Paginated anime list. */
  public paginatedAnimeList$: Observable<PaginatedData<Anime>>;

  /** Displayed columns. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Filter forms. */
  public readonly filterForms = this.formBuilder.group<AnimeFilters>({
    search: '',
    type: [],
  });

  /** FilterParams. */
  public readonly filterParams$ = new BehaviorSubject<AnimeFilters>({
    search: '',
    type: [],
  });

  /** Pagination Params. */
  public readonly paginationParams$ = new BehaviorSubject<PaginationParams>({
    limit: 0,
    page: 0,
  });

  /** Sort params. */
  public readonly sortParams$ = new BehaviorSubject<SortParams<AnimeSortField>>(
    {
      sortBy: '',
      direction: '',
    },
  );

  /** Reset pagination params. */
  public resetPagination(): void {
    this.route.queryParams
      .pipe(
        map(params => {
          const limit = params[QueryParams.Limit];
          this.paginationParams$.next({ limit, page: RESET_PAGINATION_PAGE });
        }),
        first(),
      )
      .subscribe();
  }

  /**
   * Update sort params.
   * @param event SortEvent.
   */
  public handleSortChange(event: Sort): void {
    this.resetPagination();
    this.sortParams$.next({
      sortBy: event.direction ? (event.active as AnimeSortField) : '',
      direction: event.direction,
    });
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
    this.router.navigate([], {
      queryParams: {
        [QueryParams.Page]: event.pageIndex + 1,
        [QueryParams.Limit]: event.pageSize,
      },
      queryParamsHandling: 'merge',
    });

    this.paginationParams$.next({
      limit: event.pageSize,
      page: event.pageIndex + 1,
    });
  }

  /**
   * Track by method.
   * @param _index Index.
   * @param anime Anime.
   */
  public trackByAnimeList(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    animeService: AnimeService,
  ) {
    this.paginatedAnimeList$ = combineLatest({
      paginationParams$: this.paginationParams$,
      sortParams$: this.sortParams$,
      filterParams$: this.filterParams$,
    }).pipe(
      tap(params => {
        this.router.navigate([], {
          queryParams: {
            [QueryParams.Limit]: params.paginationParams$.limit,
            [QueryParams.Page]: params.paginationParams$.page,
            [QueryParams.Search]: params.filterParams$.search ?
              params.filterParams$.search :
              null,
            [QueryParams.SortBy]: params.sortParams$.direction ?
              params.sortParams$.sortBy :
              null,
            [QueryParams.Direction]: params.sortParams$.direction ?
              params.sortParams$.direction :
              null,

            [QueryParams.FiltersType]:
              params.filterParams$.type.map(animeType =>
                AnimeType.toReadable(animeType)) ?? null,
          },
          queryParamsHandling: 'merge',
        });
      }),
      switchMap(params =>
        animeService
          .getPaginatedAnimeList({
            paginationParams: params.paginationParams$,
            sortParams: params.sortParams$,
            filterParams: params.filterParams$,
          })
          .pipe(share())),
    );
  }

  /** Check if there are query parameters or set default.*/
  public ngOnInit(): void {
    this.filterForms.valueChanges.pipe(debounceTime(400), takeUntil(this.destroy$)).subscribe({
      next: value => {
        this.filterParams$.next({
          search: value.search ?? '',
          type: value.type ?? [],
        });
        this.resetPagination();
      },
    });
    this.route.queryParams
      .pipe(
        map(params => {
          const queryLimit = params[QueryParams.Limit];
          const queryPage = params[QueryParams.Page];
          const querySearch = params[QueryParams.Search];
          const querySortBy = params[QueryParams.SortBy];
          const queryDirection = params[QueryParams.Direction];
          const queryFilterType = params[QueryParams.FiltersType];

          const limit =
            queryLimit && queryLimit >= 1 ?
              queryLimit :
              DEFAULT_QUERY_PARAMS[QueryParams.Limit];
          const page =
            queryPage && queryPage >= 1 ?
              queryPage :
              DEFAULT_QUERY_PARAMS[QueryParams.Page];
          const search =
            querySearch ?? DEFAULT_QUERY_PARAMS[QueryParams.Search];
          const sortBy =
            (querySortBy as AnimeSortField) ??
            DEFAULT_QUERY_PARAMS[QueryParams.SortBy];
          const direction =
            (queryDirection as SortDirection) ??
            DEFAULT_QUERY_PARAMS[QueryParams.Direction];

          const filterType =
            queryFilterType instanceof Array<string> ?
              (queryFilterType as string[]).map(readableAnimeType =>
                  AnimeType.toAnimeType(readableAnimeType)) :
              null;

          this.paginationParams$.next({ limit, page });
          this.sortParams$.next({
            direction: direction ?? '',
            sortBy: sortBy ?? '',
          });
          this.filterForms.setValue({
            search: search ?? '',
            type: filterType,
          });
        }),
        first(),
      )
      .subscribe();
  }

  /** Unsubscribe. */
  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
