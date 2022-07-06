import { AnimeRating } from './../enums/anime/rating.enum';
import { AnimeBroadcastDay } from './../enums/anime/broadcastDay.enum';
import { AnimeSeason } from './../enums/anime/season.enum';
import { AnimeSource } from './../enums/anime/source.enum';
import { AnimeType } from './../enums/anime/type.enum';
import { AnimeStatus } from './../enums/anime/status.enum';

import { StudioDTO } from './studio.dto';
import { GenreDto } from './genre.dto';

/** Anime DTO. */
export interface AnimeDto {

  /** Id. */
  readonly id: number;

  /** Creation time, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string;

  /** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string;

  /** Image. */
  readonly image: string;

  /** Trailer. */
  readonly trailer_youtube_id: string;

  /** Title in English. */
  readonly title_eng: string;

  /** Title in Japanese. */
  readonly title_jpn: string;

  /** Type. */
  readonly type: AnimeType;

  /** Status. */
  readonly status: AnimeStatus;

  /** Source. */
  readonly source: AnimeSource;

  /** Is airing. */
  readonly airing: boolean;

  /** Aired. */
  readonly aired: {
    readonly start: string;
    readonly end: string;
  };

  /** Rating. */
  readonly rating: AnimeRating;

  /** Season. */
  readonly season: AnimeSeason;

  /** Synopsis. */
  readonly synopsis: string;

  /** Background. */
  readonly background: string;

  /** Broadcast day. */
  readonly broadcast_day: AnimeBroadcastDay;

  /** Broadcast Time. */
  readonly broadcast_time: string;

  /** Broadcast time zone. */
  readonly broadcast_timezone: string;

  /** Studios. */
  readonly studios: readonly number[];

  /** Studios data. */
  readonly studios_data: readonly StudioDTO[];

  /** Genres. */
  readonly genres: readonly number[];

  /** Genres data. */
  readonly genres_data: readonly GenreDto[];
}
