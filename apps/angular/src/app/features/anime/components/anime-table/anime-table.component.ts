import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PaginationParams } from '@js-camp/core/models/paginationParams';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeSortField } from '@js-camp/core/enums/anime/sort';
import { AnimeFilters } from '@js-camp/core/models/anime/animeFilters';
import { SortParams } from '@js-camp/angular/core/models/sortParams';
import { MONTH_YEAR_FORMAT } from '@js-camp/angular/shared/constants/dateFormats';

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { PaginatedData } from '@js-camp/core/models/pagination';

/** QueryParams for table. */
const QUERY_PARAMS_MAP = {
  limit: 'limit',
  page: 'page',
  search: 'search',
  sortBy: 'sortBy',
  direction: 'direction',
  filtersType: 'type',
} as const;

const DEFAULT_QUERY_PARAMS = {
  [QUERY_PARAMS_MAP.limit]: 10,
  [QUERY_PARAMS_MAP.page]: 1,
  [QUERY_PARAMS_MAP.search]: null,
  [QUERY_PARAMS_MAP.sortBy]: null,
  [QUERY_PARAMS_MAP.direction]: null,
  [QUERY_PARAMS_MAP.filtersType]: null,
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
  /** Month year format. */
  public readonly mountYearFormat = MONTH_YEAR_FORMAT;

  /** Anime type map and functional. */
  public animeType = AnimeType;

  /** Anime status map and functional. */
  public animeStatus = AnimeStatus;

  private destroy$ = new Subject<boolean>();

  /** Is Loading. */
  public isLoading$ = new BehaviorSubject<boolean>(true);

  /** Sorted fields. */
  public readonly sortedFields = AnimeSortField;

  /** Anime type options. */
  public readonly filterOptionsMap = {
    type: {
      [AnimeType.Movie]: AnimeType.toReadable(AnimeType.Movie),
      [AnimeType.TV]: AnimeType.toReadable(AnimeType.TV),
      [AnimeType.OVA]: AnimeType.toReadable(AnimeType.OVA),
      [AnimeType.ONA]: AnimeType.toReadable(AnimeType.ONA),
      [AnimeType.Special]: AnimeType.toReadable(AnimeType.Special),
      [AnimeType.Music]: AnimeType.toReadable(AnimeType.Music),
      [AnimeType.Unknown]: AnimeType.toReadable(AnimeType.Unknown),
    },
  } as const;

  /** Page limit options params. */
  public readonly pageSizeOptions = [5, 10, 15, 20] as const;

  /** Displayed columns. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Paginated anime list. */
  public readonly paginatedAnimeList$: Observable<PaginatedData<Anime>>;

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

  /** Actual page. */
  public readonly paginationPage$ = new BehaviorSubject(0);

  /** Limit elements to display on a page. */
  public readonly paginationLimit$ = new BehaviorSubject(0);

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

  /**
   * Update sort params.
   * @param event SortEvent.
   */
  public handleSortChange(event: Sort): void {
    this.sortParams$.next({
      sortBy: event.direction ? (event.active as AnimeSortField) : '',
      direction: event.direction,
    });
    this.paginationPage$.next(RESET_PAGINATION_PAGE);
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
    this.paginationPage$.next(event.pageIndex + 1);
    this.paginationLimit$.next(event.pageSize);
  }

  /**
   * Track by method.
   * @param _index Index.
   * @param anime Anime.
   */
  public trackByAnimeList(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }

  private updateQueryParams(
    paginationParams: PaginationParams,
    filterParams: AnimeFilters,
    sortParams: SortParams<AnimeSortField>,
  ): void {
    this.router.navigate([], {
      queryParams: {
        [QUERY_PARAMS_MAP.limit]: paginationParams.limit,
        [QUERY_PARAMS_MAP.page]: paginationParams.page,
        [QUERY_PARAMS_MAP.search]: filterParams.search ?
          filterParams.search :
          null,
        [QUERY_PARAMS_MAP.sortBy]: sortParams.direction ?
          sortParams.sortBy :
          null,
        [QUERY_PARAMS_MAP.direction]: sortParams.direction ?
          sortParams.direction :
          null,

        [QUERY_PARAMS_MAP.filtersType]:
          filterParams.type.map(animeType =>
            AnimeType.toReadable(animeType)) ?? null,
      },
      queryParamsHandling: 'merge',
    });
  }

  public constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    animeService: AnimeService,
  ) {
    this.paginatedAnimeList$ = combineLatest([
      this.paginationLimit$,
      this.paginationPage$,
      this.sortParams$,
      this.filterParams$,
    ]).pipe(
      debounceTime(300),
      tap(() => this.isLoading$.next(true)),
      switchMap(([limit, page, sortParams, filterParams]) => {
        const paginationParams: PaginationParams = {
          limit,
          page,
        };

        this.updateQueryParams(paginationParams, filterParams, sortParams);

        return animeService
          .getPaginatedAnimeList({
            paginationParams,
            sortParams,
            filterParams,
          })
          .pipe(
            tap(() => this.isLoading$.next(false)),
            share(),
          );
      }),
    );
  }

  private getInitialValues(params: Params): {
    page: number;
    search: string;
    limit: number;
    sortBy: AnimeSortField | null;
    direction: SortDirection | null;
    filterType: AnimeType[];
  } {

    const queryLimit = params[QUERY_PARAMS_MAP.limit];
    const limit =
    queryLimit >= 1 ?
      queryLimit :
      DEFAULT_QUERY_PARAMS[QUERY_PARAMS_MAP.limit];

    const queryPage = params[QUERY_PARAMS_MAP.page];
    const page =
    queryPage && queryPage >= 1 ?
      queryPage :
      DEFAULT_QUERY_PARAMS[QUERY_PARAMS_MAP.page];

    const querySearch = params[QUERY_PARAMS_MAP.search];
    const search = querySearch ?? DEFAULT_QUERY_PARAMS[QUERY_PARAMS_MAP.search];

    const querySortBy = params[QUERY_PARAMS_MAP.sortBy];
    const sortBy =
      (querySortBy as AnimeSortField) ??
      DEFAULT_QUERY_PARAMS[QUERY_PARAMS_MAP.sortBy];

    const queryDirection = params[QUERY_PARAMS_MAP.direction];
    const direction =
      (queryDirection as SortDirection) ??
      DEFAULT_QUERY_PARAMS[QUERY_PARAMS_MAP.direction];

    const queryFilterType = params[QUERY_PARAMS_MAP.filtersType];
    const filterType: AnimeType[] = [];
    if (typeof queryFilterType === 'string') {
      filterType.push(AnimeType.fromReadableToAnimeType(queryFilterType));
    } else if (queryFilterType instanceof Array<string>) {
      queryFilterType.forEach(readableAnimeType =>
        filterType.push(AnimeType.fromReadableToAnimeType(readableAnimeType)));
    }

    return {
      direction,
      filterType,
      limit,
      page,
      search,
      sortBy,
    };
  }

  /** Check if there are query parameters or set default.*/
  public ngOnInit(): void {
    this.filterForms.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        this.filterParams$.next({
          search: value.search ?? '',
          type: value.type ?? [],
        });
        this.paginationPage$.next(RESET_PAGINATION_PAGE);
      },
    });
    this.route.queryParams
      .pipe(
        map(params => {
          const {
            direction,
            filterType,
            limit,
            page,
            search,
            sortBy,
          } = this.getInitialValues(params);

          this.paginationLimit$.next(limit);
          this.paginationPage$.next(page);

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
