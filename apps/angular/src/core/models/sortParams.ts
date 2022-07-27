import { SortDirection } from '@angular/material/sort';

/** Sort params. */
export interface SortParams<T> {

  /** Sort by. */
  sortBy: T | '';

  /** Sort direction. */
  direction: SortDirection;
}
