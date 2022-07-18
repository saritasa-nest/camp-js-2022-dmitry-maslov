import { AnimeType } from '../enums/anime/type';

import { AnimeFilterType } from './../enums/anime/filters';

/** Anime Filters interface. */
export interface AnimeFilters {

  /** Type anime. */
  [AnimeFilterType.Type]: AnimeType[];
}
