import { ANIME_LIST_REQUEST_FIELDS } from '@js-camp/core/dtos/anime-list-api-fields';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { PaginatedDataDto } from '@js-camp/core/dtos/paginated-data.dto';
import { SortDirection } from '@js-camp/core/enums/anime/sort';
import { AnimeFiltersMapper } from '@js-camp/core/mappers/anime-filters.mapper';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';
import { SortMapper } from '@js-camp/react/core/mappers/sortParamsMapper';
import { AnimeSortParams } from '@js-camp/react/core/models/animeSortParams';

import { http } from '..';
import { CONFIG } from '../config';

export namespace AnimeService {
  const animeListUrl = new URL('anime/anime/', CONFIG.apiUrl);
  let nextAnimeBaseItemsUrl: URL | null = null;

  /** Getting next anime base items.*/
  export async function getNextAnimeBaseItems(): Promise<AnimeBase[] | null> {
    if (nextAnimeBaseItemsUrl === null) {
      return null;
    }

    const { next, results } = (
      await http.get<PaginatedDataDto<AnimeDTO>>(nextAnimeBaseItemsUrl?.toString())
    ).data;

    setNextAnimeBaseItemsUrl(next);

    return results.map(animeDto =>
      AnimeMapper.fromDtoToAnimeBase(animeDto));
  }

  /** Getting first anime items. */
  export async function getFirstAnimeBaseItems(
    { filterParams, sortParams }: AnimeListParams = {
      filterParams: {
        search: '',
        type: [],
      },
      sortParams: {
        direction: SortDirection.NotSorted,
        sortBy: '',
      },
    },
  ): Promise<AnimeBase[]> {
    const { results, next } = (
      await http.get<PaginatedDataDto<AnimeDTO>>(animeListUrl.toString(), {
        params: {
          [ANIME_LIST_REQUEST_FIELDS.order]: SortMapper.toDto(sortParams),
          [ANIME_LIST_REQUEST_FIELDS.typeIn]:
            AnimeFiltersMapper.filterTypeToDto(filterParams.type),
          [ANIME_LIST_REQUEST_FIELDS.search]: filterParams.search,
        },
      })
    ).data;

    setNextAnimeBaseItemsUrl(next);

    return results.map(animeDto =>
      AnimeMapper.fromDtoToAnimeBase(animeDto));
  }

  /**
   * Sets next URL.
   * @param url Some URL.
   */
  function setNextAnimeBaseItemsUrl(url: string | null) {
    nextAnimeBaseItemsUrl = url !== null ? new URL(url) : null;
  }
}

/** Params for getting anime list. */
export interface AnimeListParams {

  /** Anime Filters. */
  readonly filterParams: AnimeFilters;

  /** Sort params. */
  readonly sortParams: AnimeSortParams;
}
