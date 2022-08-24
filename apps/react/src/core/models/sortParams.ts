import { SortDirection } from '@js-camp/core/enums/anime/sort';

/** Sort params. */
export interface SortParams<T> {

  /** Sort by. */
  sortBy: T | '';

  /** Sort direction. */
  direction: SortDirection;
}
