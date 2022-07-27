
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

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  first,
  map,
  Observable,
  Subject,
  switchMap,
} from 'rxjs';

/** QueryParams for table. */
enum QueryParams {
  Limit = 'limit',
  Page = 'page',
  Search = 'search',
  SortBy = 'sortBy',
  Direction = 'direction',
}

const DEFAULT_QUERY_PARAMS = {
  [QueryParams.Limit]: 10,
  [QueryParams.Page]: 1,
  [QueryParams.Search]: null,
  [QueryParams.SortBy]: null,
  [QueryParams.Direction]: null,
};

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
  /** Sorted fields. */
  public sortedFields = AnimeSortField;

  private destroy$ = new Subject<void>();

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
    this.router.navigate([], {
      queryParams: {
        [QueryParams.Page]: 1,
      },
      queryParamsHandling: 'merge',
    });

    this.route.queryParams
      .pipe(
        map(params => {
          const limit = params[QueryParams.Limit];

          this.paginationParams$.next({
            limit,
            page: 1,
          });
        }),
        first(),
      )
      .subscribe();
  }

  /** Filter params. */
  public readonly filterParams$ = new BehaviorSubject<{
    search: string;
  }>({
    search: '',
  });

  /** Methods that result in a readable model. */
  public readonly toReadable = {
    type: AnimeType.toReadable,
    status: AnimeStatus.toReadable,
  };

  /**
   * Update sort params.
   * @param event SortEvent.
   */
  public handleSortChange(event: Sort): void {
    this.resetPagination();

    this.router.navigate([], {
      queryParams: {
        [QueryParams.SortBy]: event.direction ? event.active : null,
        [QueryParams.Direction]: event.direction || null,
      },
      queryParamsHandling: 'merge',
    });

    this.sortParams$.next({
      sortBy: event.direction ? (event.active as AnimeSortField) : '',
      direction: event.direction,
    });
  }

  /**
   * Change search params.
   * @param event KeyboardEvent.
   */
  public handleSearchChange(event: KeyboardEvent): void {
    const searchValue = (event.target as HTMLInputElement).value;

    this.resetPagination();

    this.router.navigate([], {
      queryParams: {
        [QueryParams.Search]: searchValue.length ? searchValue : null,
      },
      queryParamsHandling: 'merge',
    });

    this.filterParams$.next({
      search: searchValue,
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
    public router: Router,
    public route: ActivatedRoute,
    animeService: AnimeService,
  ) {
    this.paginatedAnimeList$ = combineLatest({
      paginationParams$: this.paginationParams$,
      filterParams$: this.filterParams$,
      sortParams$: this.sortParams$,
    }).pipe(
      switchMap(params =>
        animeService.getPaginatedAnimeList(
          params.paginationParams$,
          params.filterParams$.search ?? '',
          params.sortParams$,
        )),
    );
  }

  /** Check if there are query parameters or set default.*/
  public ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map(params => {
          const queryLimit = params[QueryParams.Limit];
          const queryPage = params[QueryParams.Page];
          const querySearch = params[QueryParams.Search];
          const querySortBy = params[QueryParams.SortBy];
          const queryDirection = params[QueryParams.Direction];

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

          this.router.navigate([], {
            queryParams: {
              [QueryParams.Limit]: limit,
              [QueryParams.Page]: page,
              [QueryParams.Search]: search,
              [QueryParams.Direction]: direction,
              [QueryParams.SortBy]: sortBy,
            },
            queryParamsHandling: 'merge',
          });

          this.paginationParams$.next({ limit, page });
          this.filterParams$.next({ search });
          this.sortParams$.next({
            direction: direction ?? '',
            sortBy: sortBy ?? '',
          });
        }),
        first(),
      )
      .subscribe();
  }
}
