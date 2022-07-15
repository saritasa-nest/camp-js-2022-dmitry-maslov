import { AnimeType } from '../enums/anime/type';

import { AnimeFilter } from './../enums/anime/filters';

export interface AnimeFilters {

  /**  */
  [AnimeFilter.Type]: AnimeType[];
}
