import { AnimeType } from './../enums/anime/type.enum';
import { AnimeStatus } from './../enums/anime/status.enum';

/** ListAnime DTO. */
export interface ListAnimeDTO {

  /** Id. */
  readonly id: number;

  /** Creation time, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string;

  /** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string;

  /** Title in English. */
  readonly title_eng: string;

  /** Title in Japanese. */
  readonly title_jpn: string;

  /** Image. */
  readonly image: string;

  /** Aired. */
  readonly aired: {
    readonly start: string;
    readonly end: string;
  };

  /** Type. */
  readonly type: AnimeType;

  /** Status. */
  readonly status: AnimeStatus;
}
