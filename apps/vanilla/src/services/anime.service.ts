import { ListAnimeDTO } from '@js-camp/core/dtos/animeList.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { ListAnimeMapper } from '@js-camp/core/mappers/listAnime.mapper';
import { ListAnime } from '@js-camp/core/models/listAnime';
import { AxiosRequestConfig } from 'axios';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Api } from 'axios-es6-class';

// TODO: Normal JSDOC

export const apiConfig: AxiosRequestConfig = {
  // TODO: Забрать из env
  baseURL: 'https://api.camp-js.saritasa.rocks/api/v1/anime',
  headers: {
    // TODO: Забрать из env
    'Api-Key': '520f134a-60a7-44de-83ef-7ef6badd9fda',
  },
};

/**
 * AnimeApi Service.
 * //TODO: нормальный комментарий.
 */
export class AnimeApi extends Api {
  public constructor(config: AxiosRequestConfig) {
    super(config);
  }

  /**
   * Get Paginated List Anime List.
   * @param limit Limit data.
   * @param offset Offset.
   * @param ordering Ordering.
   */
  public async getPaginatedListAnimeList({
    limit = 25,
    offset = 0,
    ordering = 'id',
  }: { limit?: number; offset?: number; ordering?: string; }):
  Promise<GetPaginatedListAnimeListResponse> {
    const response = await this.get<PaginationDto<ListAnimeDTO>>(`/anime/`, {
      params: {
        limit,
        offset,
        ordering: `${ordering}`,
      },
    });

    const { count, results } = PaginationMapper.fromDto<ListAnime, ListAnimeDTO>(ListAnimeMapper.fromDto, response.data);

    return {
      count,
      limit,
      offset,
      ordering,
      results,
    };
  }
}

/**
 * TODO: JSDOC.
 */
interface GetPaginatedListAnimeListResponse {

  /**
   *
   */
  results: ListAnime[];

  /**
   *
   */
  count: number;

  /**
   *
   */
  offset: number;

  /**
   *
   */
  limit: number;

  /**
   *
   */
  ordering: string;
}

export const animeApi = new AnimeApi(apiConfig);
