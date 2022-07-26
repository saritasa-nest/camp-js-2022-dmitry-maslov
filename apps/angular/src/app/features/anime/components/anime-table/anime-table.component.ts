import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PaginationParams } from '@js-camp/core/interfaces/paginationParams';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { PageEvent } from '@angular/material/paginator';

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnDestroy {
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

  /** Methods that result in a readable model. */
  public readonly toReadable = {
    type: AnimeType.toReadable,
    status: AnimeStatus.toReadable,
  };

  /**
   * Handlers pagination change.
   * @param event Paginator event.
   */
  public handlePaginationChange(event: PageEvent): void {
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
    router: Router,
    route: ActivatedRoute,
    animeService: AnimeService,
  ) {
    route.queryParams
      .pipe(
        map(params => {
          const limit =
            params['limit'] && params['limit'] >= 1 ? params['limit'] : 10;
          const page =
            params['page'] && params['page'] >= 1 ? params['page'] : 1;

          this.paginationParams$.next({
            limit,
            page,
          });
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.paginatedAnimeList$ = combineLatest({
      paginationParams$: this.paginationParams$,
    }).pipe(
      switchMap(params =>
        animeService.getPaginatedAnimeList(params.paginationParams$)),
      tap(params => {
        router.navigate([], {
          queryParams: {
            page: params.paginationParams.page,
            limit: params.paginationParams.limit,
          },
        });
      }),
    );
  }

  /** Unsubscribing from the router. */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
