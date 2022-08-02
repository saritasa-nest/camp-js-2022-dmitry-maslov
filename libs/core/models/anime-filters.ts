
import { AnimeType } from './anime-type';

/** Anime Filters. */
export interface AnimeFilters {

  /** Search. */
  readonly search: string;

  /** Type. */
  readonly type: readonly AnimeType[];
}
