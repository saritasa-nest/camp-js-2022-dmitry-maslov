import { AnimeType } from '../../core/models/anime/animeType';

import { AnimeFilterType } from './../enums/anime/filters';

/** Anime Filters interface. */
export interface AnimeFilters {

  /** Type anime. */
  [AnimeFilterType.Type]: AnimeType[];
}
