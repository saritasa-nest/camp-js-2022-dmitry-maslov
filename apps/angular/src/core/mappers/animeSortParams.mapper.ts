import { AnimeSortParams } from '../models/animeSortParams';

export namespace AnimeSortMapper {

  /**
   * Map AnimeSortParams to dto.
   * @param sortParams Anime sortParams.
   */
  export function toDto(sortParams: AnimeSortParams): string {
    if (sortParams.direction === '') {
      return 'id';
    } else if (sortParams.direction === 'desc') {
      return `-${sortParams.sortBy}`;
    }
    return sortParams.sortBy;
  }
}
