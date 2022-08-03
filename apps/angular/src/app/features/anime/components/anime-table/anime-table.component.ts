import { Component } from '@angular/core';

import { Anime } from '@js-camp/core/models/anime/anime';
import { AnimeType } from '@js-camp/core/models/anime/animeType';
import { AnimeStatus } from '@js-camp/core/models/anime/animeStatus';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { MONTH_YEAR_FORMAT } from '@js-camp/angular/shared/constants/dateFormats';

/** Anime table component. */
@Component({
  selector: 'camp-anime-table',
  templateUrl: './anime-table.component.html',
  styleUrls: ['./anime-table.component.css'],
})
export class AnimeTableComponent {
  /** Month year format. */
  public readonly monthYearFormat = MONTH_YEAR_FORMAT;

  /** Displayed columns. */
  public readonly displayedColumns = [
    'image',
    'titleEng',
    'titleJpn',
    'airedStart',
    'type',
    'status',
  ] as const;

  /** Anime list. */
  public readonly paginatedAnimeList$ = this.animeService.getPaginatedAnimeList();

  /** AnimeType map and functional. */
  public readonly animeType = AnimeType;

  /** AnimeStatus map and functional. */
  public readonly animeStatus = AnimeStatus;

  public constructor(private readonly animeService: AnimeService) {}

  /**
   * Track by method.
   * @param _index Index.
   * @param anime Anime.
   */
  public trackById(_index: number, anime: Anime): Anime['id'] {
    return anime.id;
  }
}
