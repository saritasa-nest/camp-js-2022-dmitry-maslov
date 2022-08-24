import { SortDirection } from '@js-camp/core/enums/anime/sort';

import { SortParams } from '../models/sortParams';

export namespace SortMapper {

  /** @inheritdoc */
  export function toDto<K, T extends SortParams<K>>(sortParams: T): string {

    if (sortParams.direction === SortDirection.NotSorted) {
      return 'id';
    } else if (sortParams.direction === SortDirection.Decrease) {
      return `-${sortParams.sortBy}`;
    }
    return sortParams.sortBy as string;
  }
}
