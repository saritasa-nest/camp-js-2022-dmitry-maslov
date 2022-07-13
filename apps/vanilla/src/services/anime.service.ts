import {
  AnimeOrders,
} from '@js-camp/core/enums/anime/ordering.enum';
import { ListAnimeDTO } from '@js-camp/core/dtos/animeList.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { ListAnimeMapper } from '@js-camp/core/mappers/listAnime.mapper';
import { ListAnime } from '@js-camp/core/models/listAnime';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Api } from 'axios-es6-class';

import { apiConfig } from '../config/apiConfig';

/**
 * Anime API class.
 */
export class AnimeApi extends Api {
  public constructor() {
    super(apiConfig);
  }

  /**
   * Get Paginated List Anime List.
   * @param limit Limit data.
   * @param offset Offset.
   * @param ordering Ordering.
   */
  public async getPaginatedListAnimeList({
    limit,
    offset,
    ordering,
  }: GetPaginatedListAnimeListRequest): Promise<GetPaginatedListAnimeListResponse> {
    const response = await this.get<PaginationDto<ListAnimeDTO>>(`anime/anime/`, {
      params: {
        limit,
        offset,
        ordering: `${ordering || 'id'}`.trim(),
      },
    });

    const { count, results } = PaginationMapper.fromDto<
      ListAnime,
      ListAnimeDTO
    >(ListAnimeMapper.fromDto, response.data);

    return {
      count,
      results,
    };
  }
}

/**
 * Method response.
 */
export interface GetPaginatedListAnimeListResponse {

  /**
   * Anime array in server.
   */
  results: ListAnime[];

  /**
   * Count elements in server.
   */
  count: number;
}

/**
 * Request.
 */
export interface GetPaginatedListAnimeListRequest {

  /** Limit results. */
  limit: number;

  /** Offset. */
  offset: number;

  /** Ordering. */
  ordering: AnimeOrders;
}

export const animeApi = new AnimeApi();
