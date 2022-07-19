import { AnimeTypeDto } from '../enums/anime/type';

import { AnimeStatusDto } from './../enums/anime/status';

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
  readonly aired: {
    readonly start: string | null;
    readonly end: string | null;
  };

  /** Type. */
  readonly type: AnimeTypeDto;

  /** Status. */
  readonly status: AnimeStatusDto;
}
