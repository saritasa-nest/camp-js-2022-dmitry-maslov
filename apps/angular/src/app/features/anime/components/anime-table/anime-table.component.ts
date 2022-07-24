import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';

import { AnimeService } from '../../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {
  /** Displayed columns. */
  public displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Anime list observer. */
  public readonly animeList$: Observable<readonly Anime[]>;

  /** Methods that result in a readable model. */
  public readonly toReadable = {
    type: AnimeType.toReadable,
    status: AnimeStatus.toReadable,
  };

  public constructor(
    animeService: AnimeService,
  ) {
    this.animeList$ = animeService.getAnimeList();
  }
}
