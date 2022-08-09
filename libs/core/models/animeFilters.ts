
import { AnimeType } from './animeType';

/** Anime Filters. */
export interface AnimeFilters {

  /** Search. */
  readonly search: string;

  /** Type. */
  readonly type: readonly AnimeType[];
}
