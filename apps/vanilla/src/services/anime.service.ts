import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { Anime } from '@js-camp/core/models/anime/anime';

import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';

import { Api } from 'axios-es6-class';

import { SortDirection } from '@js-camp/core/enums/anime/sort';

import { apiConfig } from '../config/apiConfig';
import { SortParams } from '../components/AnimeTableComponents/animeTableHeader';

/** Anime API class. */
export class AnimeApi extends Api {
  public constructor() {
    super(apiConfig);
  }

  /**
   * Get Paginated Anime List.
   * @param limit Limit data.
   * @param offset Offset.
   * @param sortParams SortPrams.
   */
  public async getPaginatedAnime({
    limit,
    offset,
    sortParams: ordering,
  }: PaginatedAnimeRequest): Promise<PaginatedAnimeResponse> {
    const response = await this.get<PaginationDto<AnimeDTO>>(`anime/anime/`, {
      params: {
        limit,
        offset,
        ordering: this.orderMapper(ordering),
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

  private orderMapper(sortParams: SortParams): string {
    const { sortDirection, sortField } = sortParams;

    if (sortDirection === SortDirection.NotSorted) {
      return 'id';
    }

    return `${sortDirection === SortDirection.Decrease ? '-' : ''}${sortField}`.trim();
  }
}

/** Method response. */
export interface PaginatedAnimeResponse {

  /** Anime array in server.*/
  results: readonly Anime[];

  /** Count elements in server.*/
  readonly count: number;
}

/** Request. */
export interface PaginatedAnimeRequest {

  /** Limit results. */
  readonly limit: number;

  /** Offset. */
  readonly offset: number;

  /** Ordering. */
  readonly sortParams: SortParams;
}

export const animeApi = new AnimeApi();
