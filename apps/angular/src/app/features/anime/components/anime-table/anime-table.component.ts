import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { PaginationParams } from '@js-camp/core/models/paginationParams';

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
  /** Displayed columns. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Total number of items on the server. */
  public total$ = new BehaviorSubject(0);

  /** Anime list. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Pagination Params. */
  public readonly paginationParams$ = new BehaviorSubject<PaginationParams>(
    new PaginationParams({
      limit: 10,
      page: 1,
    }),
  );

  /** Methods that result in a readable model. */
  public readonly toReadable = {
    type: AnimeType.toReadable,
    status: AnimeStatus.toReadable,
  };

  /**
   * Track by method.
   * @param _index Index.
   * @param anime Anime.
   */
  public trackByAnimeList(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }

  public constructor(animeService: AnimeService) {
    const getPaginatedAnimeList$ = combineLatest({
      paginationParams$: this.paginationParams$,
    }).pipe(
      switchMap(params =>
        animeService.getPaginatedAnimeList(params.paginationParams$)),
    );

    const paginatedAnimeList$ = getPaginatedAnimeList$.pipe(
      tap(paginatedData => {
        this.total$.next(paginatedData.total);
      }),
    );

    this.animeList$ = paginatedAnimeList$.pipe(
      map(paginatedData => paginatedData.results),
    );
  }
}
