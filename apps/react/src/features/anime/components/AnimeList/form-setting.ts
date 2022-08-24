import { SortDirection } from '@js-camp/core/enums/anime/sort';
import { AnimeListParams } from '@js-camp/react/api/services/animeService';

export type ListManagerValue = AnimeListParams;

export const initialValues: ListManagerValue = {
  filterParams: {
    search: '',
    type: [],
  },
  sortParams: {
    direction: SortDirection.NotSorted,
    sortBy: '',
  },
};
