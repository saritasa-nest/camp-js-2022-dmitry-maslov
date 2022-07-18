import { AnimeType } from '../enums/anime/type';

import { AnimeFilterType } from './../enums/anime/filters';

export interface AnimeFilters {

  /**  */
  [AnimeFilterType.Type]: AnimeType[];
}
