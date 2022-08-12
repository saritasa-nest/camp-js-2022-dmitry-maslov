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

  /** Genres. */
  readonly genres: readonly number[];

  /** Studios. */
  readonly studios: readonly number[];

  /** Genres data. */
  readonly genres_data: readonly GenreDto[];

  /** Studios data. */
  readonly studios_data: readonly StudioDto[];

  /** YouTube trailer id. */
  readonly trailer_youtube_id: string;
}
