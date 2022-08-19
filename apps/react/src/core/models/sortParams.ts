import { SortDirection } from '@mui/material';

/** Sort params. */
export interface SortParams<T> {

  /** Sort by. */
  sortBy: T | '';

  /** Sort direction. */
  direction: SortDirection;
}
