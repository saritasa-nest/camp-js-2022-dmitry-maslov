import {
  AnimeOrders,
} from '@js-camp/core/enums/anime/ordering';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime';

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
   * @param search Search term.
   */
  public async getPaginatedListAnimeList({
    limit,
    offset,
    ordering,
    search,
  }: PaginatedListAnimeListRequest): Promise<PaginatedListAnimeListResponse> {
    const response = await this.get<PaginationDto<AnimeDTO>>(`anime/anime/`, {
      params: {
        limit,
        offset,
        ordering: `${ordering || 'id'}`.trim(),
        search,
      },
    });

    const { count, results } = PaginationMapper.fromDto<
      Anime,
      AnimeDTO
    >(AnimeMapper.fromDto, response.data);

    return {
      count,
      results,
    };
  }
}

/**
 * Method response.
 */
export interface PaginatedListAnimeListResponse {

  /** Anime array in server.*/
  results: Anime[];

  /** Count elements in server.*/
  count: number;
}

/** Request. */
export interface PaginatedListAnimeListRequest {

  /** Limit results. */
  limit: number;

  /** Offset. */
  offset: number;

  /** Ordering. */
  ordering: AnimeOrders;

  /** Search term. */
  readonly search: string;
}

export const animeApi = new AnimeApi();
