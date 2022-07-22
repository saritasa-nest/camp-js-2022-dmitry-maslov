import { Anime } from '@js-camp/core/models/anime/anime';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AnimeType } from '@js-camp/core/models/anime/animeType';

import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';

import { AnimeService } from './../../../../core/services/anime.service';

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {
  /** Displayed columns. */
  public displayedColumns: string[] = [
    'image',
    'title_eng',
    'title_jpn',
    'aired_start',
    'type',
    'status',
  ];

  /** Anime list observer. */
  public animeList$: Observable<Anime[]>;

  /** Methods that result in a readable model. */
  public toReadable = {
    type: AnimeType.toReadable,
    status: AnimeStatus.toReadable,
  };

  public constructor(
    private animeService: AnimeService,
  ) {
    this.animeList$ = animeService.getAnimeList();
  }
}
