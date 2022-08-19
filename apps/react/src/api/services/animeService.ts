import { ANIME_LIST_REQUEST_FIELDS } from '@js-camp/core/dtos/anime-list-api-fields';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { PaginatedDataDto } from '@js-camp/core/dtos/paginated-data.dto';
import { AnimeFiltersMapper } from '@js-camp/core/mappers/anime-filters.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { PaginatedDataMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { SortMapper } from '@js-camp/react/core/mappers/sortParamsMapper';
import { AnimeSortParams } from '@js-camp/react/core/models/animeSortParams';

import { http } from '..';
import { CONFIG } from '../config';

export namespace AnimeService {
  const animeListUrl = new URL('anime/anime/', CONFIG.apiUrl);

  /**
   * Function for getting paginated anime list.
   * @param PaginatedAnimeListParams {@link PaginatedAnimeListParams}.
   */
  export async function getPaginatedAnimeList({
    filterParams = { search: '', type: [] },
    paginationParams = { limit: 25, page: 1 },
    sortParams = { direction: false, sortBy: '' },
  }: PaginatedAnimeListParams): Promise<PaginatedData<AnimeBase>> {
    const { offset, limit } = PaginationParamsMapper.toDto(paginationParams);

    const PaginatedAnimeListDto = (await http.get< PaginatedDataDto<AnimeDTO>>(animeListUrl.toString(), {
      params: {
        [ANIME_LIST_REQUEST_FIELDS.limit]: limit,
        [ANIME_LIST_REQUEST_FIELDS.offset]: offset,
        [ANIME_LIST_REQUEST_FIELDS.order]: SortMapper.toDto(sortParams),
        [ANIME_LIST_REQUEST_FIELDS.typeIn]: AnimeFiltersMapper.filterTypeToDto(filterParams.type),
        [ANIME_LIST_REQUEST_FIELDS.search]: filterParams.search,
      },
    })).data;

    return PaginatedDataMapper.fromDto({
      dto: PaginatedAnimeListDto,
      resultMapper: AnimeMapper.fromDtoToAnimeBase,
    });
  }
}

/** Params for getting anime list. */
export interface PaginatedAnimeListParams {

  /** Pagination params. */
  readonly paginationParams: PaginationParams;

  /** Anime Filters. */
  readonly filterParams: AnimeFilters;

  /** Sort params. */
  readonly sortParams: AnimeSortParams;
}
