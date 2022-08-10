import { AnimeSortField, SortDirection } from '@js-camp/core/enums/anime/sort';
import { PaginationParams } from '@js-camp/core/models/paginationParams';
import { SortParams } from '@js-camp/core/models/sort-params';

/** Table manager. */
export class TableManager<SortFields> {
  private readonly pagintaionParams: PaginationParams = {
    limit: 10,
    page: 1,
  };

  private readonly sortParam: SortParams<SortFields> = {
    sortDirection: SortDirection.NotSorted,
    sortField: '',
  };

}
