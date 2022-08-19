import { SortParams } from '../models/sortParams';

export namespace SortMapper {

  /** @inheritdoc */
  export function toDto<K, T extends SortParams<K>>(sortParams: T): string {
    if (!sortParams.direction) {
      return 'id';
    } else if (sortParams.direction === 'desc') {
      return `-${sortParams.sortBy}`;
    }
    return sortParams.sortBy as string;
  }
}
