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
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { PaginatedData } from '@js-camp/core/models/pagination';

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

  /** Filter forms. */
  public readonly filterForms = this.formBuilder.group<AnimeFilters>({
    search: '',
    type: [],
  });

  /** FilterParams. */
  public readonly filterParams$: Observable<AnimeFilters> = this.route.queryParams.pipe(
    first(),
    map(queryParams => {
      const initialFilterParams = this.getFilterParamsFromQuery(queryParams);
      this.filterForms.setValue(initialFilterParams);
      return initialFilterParams;
    }),
    switchMap(initialFilterParams => this.filterForms.valueChanges.pipe(
      startWith(initialFilterParams),
      tap(() => this.resetPagination()),
      map(value => ({
        search: value.search ?? '',
        type: value.type ?? [],
      })),
    )),
  );

  /** Pagination params. */
  public paginationParams$ = this.route.queryParams.pipe(
    first(),
    switchMap(initialQueryParams => this.paginationForm.valueChanges.pipe(
      startWith(this.getPaginationParamsFromQuery(initialQueryParams)),
      map(paginationParams => ({
        page: paginationParams.page ?? DEFAULT_PARAMS.paginationParams.page,
        limit: paginationParams.limit ?? DEFAULT_PARAMS.paginationParams.limit,
      })),
    )),
  );

  /** Sort params. */
  public readonly sortParams$: Observable<SortParams<AnimeSortField>> = this.route.queryParams.pipe(
    first(),
    switchMap(queryParams => this.sortForm.valueChanges.pipe(
      startWith(this.getSortParamsFromQuery(queryParams)),
      map(value => ({
        direction: value.direction ?? DEFAULT_PARAMS.sortParams.direction,
        sortBy: value.sortBy ?? DEFAULT_PARAMS.sortParams.direction,
      })),
    )),
  );

  private readonly paginationForm = this.formBuilder.group<PaginationParams>({
    limit: DEFAULT_PARAMS.paginationParams.limit,
    page: DEFAULT_PARAMS.paginationParams.page,
  });

  private readonly sortForm = this.formBuilder.group<SortParams<AnimeSortField>>({
    direction: '',
    sortBy: '',
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    animeService: AnimeService,
  ) {
    this.paginatedAnimeList$ = combineLatest([
      this.paginationParams$,
      this.sortParams$,
      this.filterParams$,
    ]).pipe(
      debounceTime(300),
      tap(() => this.isLoading$.next(true)),
      switchMap(([paginationParams, sortParams, filterParams]) => {

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

  /**
   * Update sort params.
   * @param event SortEvent.
   */
  public handleSortChange(event: Sort): void {
    this.sortForm.setValue({
      direction: event.direction,
      sortBy: event.direction ? (event.active as AnimeSortField) : DEFAULT_PARAMS.sortParams.sortBy,
    });
    this.resetPagination();
  }

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
    this.paginationForm.setValue({
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

  private resetPagination(): void {
    this.paginationForm.setValue({
      limit: this.paginationForm.value.limit ?? DEFAULT_PARAMS.paginationParams.limit,
      page: RESET_PAGINATION_PAGE,
    });
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

  private getSortParamsFromQuery(queryParams: Params): SortParams<AnimeSortField> {
    return {
      direction: queryParams[QUERY_PARAMS_MAP.direction] as SortDirection ?? DEFAULT_PARAMS.sortParams.direction,
      sortBy: queryParams[QUERY_PARAMS_MAP.sortBy] as AnimeSortField ?? DEFAULT_PARAMS.sortParams.sortBy,
    };
  }

  private getPaginationParamsFromQuery(queryParams: Params): PaginationParams {
    return {
      limit: queryParams[QUERY_PARAMS_MAP.limit] as number ?? DEFAULT_PARAMS.paginationParams.limit,
      page: queryParams[QUERY_PARAMS_MAP.page] as number ?? DEFAULT_PARAMS.paginationParams.page,
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
      search: queryParams[QUERY_PARAMS_MAP.search] as string ?? '',
      type: filterType,
    };
  }
}
