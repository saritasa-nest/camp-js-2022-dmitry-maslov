import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import {
  AnimeService,
  PaginatedAnimeListParams,
} from '@js-camp/angular/core/services/anime.service';
import { PaginationParams } from '@js-camp/core/models/paginationParams';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort, SortDirection } from '@angular/material/sort';
import { AnimeSortField } from '@js-camp/core/enums/anime/sort';
import { AnimeFilters } from '@js-camp/core/models/anime/animeFilters';
import { MONTH_YEAR_FORMAT } from '@js-camp/angular/shared/constants/dateFormats';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  first,
  map,
  Observable,
  share,
  skip,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { AnimeSortParams } from '@js-camp/angular/core/models/anime/animeSortParams';

const DEFAULT_PARAMS = {
  paginationParams: {
    page: 1,
    limit: 10,
  },
  sortParams: {
    direction: '',
    sortBy: '',
  },
} as const;

/** QueryParams for table. */
const QUERY_PARAMS_MAP = {
  limit: 'limit',
  page: 'page',
  search: 'search',
  sortBy: 'sortBy',
  direction: 'direction',
  filtersType: 'type',
} as const;

const RESET_PAGINATION_PAGE = 1;

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
  /** Month year format. */
  public readonly monthYearFormat = MONTH_YEAR_FORMAT;

  /** Anime type map and functional. */
  public animeType = AnimeType;

  /** Anime status map and functional. */
  public animeStatus = AnimeStatus;

  /** Is Loading. */
  public isLoading$ = new BehaviorSubject<boolean>(true);

  /** Sorted fields. */
  public readonly sortedFields = AnimeSortField;

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

  /** Pagination limit. */
  public readonly paginationLimit$ = new BehaviorSubject<number>(DEFAULT_PARAMS.paginationParams.limit);

  /** Pagination page. */
  public readonly paginationPage$ = new BehaviorSubject<number>(DEFAULT_PARAMS.paginationParams.page);

  /** Sort params. */
  public readonly sortParams$ = new BehaviorSubject<AnimeSortParams>({
    direction: '',
    sortBy: '',
  });

  /** Filter forms. */
  public readonly filterForms = this.formBuilder.nonNullable.group<AnimeFilters>({
    search: '',
    type: [],
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    animeService: AnimeService,
  ) {

    this.setInitialParams();

    const filterParams$ = this.filterForms.valueChanges.pipe(
      tap(() => this.resetPagination()),
      skip(1),
      startWith(this.filterForms.value),
      map(({ search, type }) => ({
        search: search ?? '',
        type: type ?? [],
      })),
    );

    this.paginatedAnimeList$ = combineLatest([
      this.paginationPage$,
      this.paginationLimit$,
      this.sortParams$,
      filterParams$,
    ]).pipe(
      debounceTime(300),
      tap(() => this.isLoading$.next(true)),
      switchMap(([page, limit, sortParams, filterParams]) => {
        const paginationParams: PaginationParams = {
          page,
          limit,
        };

        this.updateQueryParams({
          paginationParams,
          filterParams,
          sortParams,
        });

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

  /**
   * Update sort params.
   * @param event SortEvent.
   */
  public handleSortChange(event: Sort): void {
    this.sortParams$.next({
      direction: event.direction,
      sortBy: event.active as AnimeSortField,
    });
    this.resetPagination();
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
    this.paginationLimit$.next(event.pageSize);
    this.paginationPage$.next(event.pageIndex + 1);
  }

  /**
   * Track by method.
   * @param _index Index.
   * @param anime Anime.
   */
  public trackById(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }

  private resetPagination(): void {
    this.paginationPage$.next(RESET_PAGINATION_PAGE);
  }

  private updateQueryParams({
    paginationParams,
    filterParams,
    sortParams,
  }: PaginatedAnimeListParams): void {
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

  private getSortParamsFromQuery(queryParams: Params): AnimeSortParams {
    return {
      direction:
        (queryParams[QUERY_PARAMS_MAP.direction] as SortDirection) ??
        DEFAULT_PARAMS.sortParams.direction,
      sortBy:
        (queryParams[QUERY_PARAMS_MAP.sortBy] as AnimeSortField) ??
        DEFAULT_PARAMS.sortParams.sortBy,
    };
  }

  private getPaginationParamsFromQuery(queryParams: Params): PaginationParams {
    return {
      limit:
        (queryParams[QUERY_PARAMS_MAP.limit] as number) ??
        DEFAULT_PARAMS.paginationParams.limit,
      page:
        (queryParams[QUERY_PARAMS_MAP.page] as number) ??
        DEFAULT_PARAMS.paginationParams.page,
    };
  }

  private getFilterParamsFromQuery(queryParams: Params): AnimeFilters {
    const queryFilterType = queryParams[QUERY_PARAMS_MAP.filtersType];
    const filterType: AnimeType[] = [];

    if (typeof queryFilterType === 'string') {
      filterType.push(AnimeType.fromReadableToAnimeType(queryFilterType));
    } else if (queryFilterType instanceof Array<string>) {
      queryFilterType.forEach(readableAnimeType =>
        filterType.push(AnimeType.fromReadableToAnimeType(readableAnimeType)));
    }

    return {
      search: (queryParams[QUERY_PARAMS_MAP.search] as string) ?? '',
      type: filterType,
    };
  }

  private setInitialParams(): void {
    this.route.queryParams
      .pipe(
        first(),
        tap(initialQueryParams => {
          this.setInitialParamsFromQuery(initialQueryParams);
        }),
      ).subscribe();
  }

  private setInitialParamsFromQuery(initialQueryParams: Params): void {
    const paginationParams = this.getPaginationParamsFromQuery(initialQueryParams);

    this.paginationPage$.next(paginationParams.page);
    this.paginationLimit$.next(paginationParams.limit);
    this.sortParams$.next(this.getSortParamsFromQuery(initialQueryParams));
    this.filterForms.setValue(this.getFilterParamsFromQuery(initialQueryParams));
  }
}
