import { SortDirection } from '../enums/anime/sort';

/** Sort Params. */
export interface SortParams<T> {

  /** Sort Fields. */
  sortField: T & '';

  /** Sort direction. */
  sortDirection: SortDirection;
}
