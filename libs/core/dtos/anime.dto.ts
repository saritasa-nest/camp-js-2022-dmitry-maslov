import { AnimeRating } from '../models/anime-rating';
import { AnimeSeason } from '../models/anime-season';
import { AnimeSource } from '../models/anime-source';
import { AnimeStatus } from '../models/anime-status';
import { AnimeType } from '../models/anime-type';

import { DateRangeDto } from './date-range.dto';

import { GenreDto } from './genre.dto';
import { StudioDto } from './studio.dto';

/** Anime DTO. */
export interface AnimeDTO {

  /** Id. */
  readonly id: number;

  /** Title in English. */
  readonly title_eng: string;

  /** Title in Japanese. */
  readonly title_jpn: string;

  /** Image. */
  readonly image: string;

  /** Aired. */
  readonly aired: DateRangeDto;

  /** Airing. */
  readonly airing: boolean;

  /** Type. */
  readonly type: AnimeType;

  /** Synopsis. */
  readonly synopsis: string;

  /** Status. */
  readonly status: AnimeStatus;

  /** Genres id. */
  readonly genres: readonly number[];

  /** Studios id. */
  readonly studios: readonly number[];

  /** Genres data. */
  readonly genres_data: readonly GenreDto[];

  /** Studios data. */
  readonly studios_data: readonly StudioDto[];

  /** YouTube trailer id. */
  readonly trailer_youtube_id: string;

  /** Rating. */
  readonly rating: AnimeRating;

  /** Source. */
  readonly source: AnimeSource;

  /** Season. */
  readonly season: AnimeSeason;
}
