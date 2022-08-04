import { AnimeSortParams } from '../models/animeSortParams';

export namespace AnimeSortMapper {

  /**
   * Map AnimeSortParams to dto.
   * @param sortParams Anime sortParams.
   */
  export function toDto(sortParams: AnimeSortParams): string {
    let order = '';

    if (sortParams.direction === '') {
      order = 'id';
    } else if (sortParams.direction === 'desc') {
      order = `-${sortParams.sortBy}`;
    } else {
      order = sortParams.sortBy;
    }

    return order;
  }
}
