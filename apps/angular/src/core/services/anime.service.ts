import { PaginatedDataMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime/anime';
import { PaginatedDataDto } from '@js-camp/core/dtos/pagination.dto';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/paginationParams';
import { PaginationParamsMapper } from '@js-camp/core/mappers/paginationParams.mapper';
import { AnimeSortField } from '@js-camp/core/enums/anime/sort';

import { map, Observable } from 'rxjs';

import { SortParams } from '../models/sortParams';

import { AppConfigService } from './app-config.service';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private readonly animeUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
  ) {
    this.animeUrl = new URL('anime/anime/', appConfig.apiUrl);
  }

  /**
   * Method for getting paginated anime list.
   * @param GetPaginatedAnimeListParams {GetPagintedAnimeListParams}.
   */
  public getPaginatedAnimeList({ sortParams, search, paginationParams }: GetPagintedAnimeListParams): Observable<PaginatedData<Anime>> {
    const { offset, limit } = PaginationParamsMapper.toDto(paginationParams);

    return this.httpClient
      .get<PaginatedDataDto<AnimeDTO>>(this.animeUrl.toString(), {
      params: {
        [API_FIELDS.offset]: offset,
        [API_FIELDS.limit]: limit,
        [API_FIELDS.order]: sortParams.direction ? `${sortParams.direction === 'desc' ? '-' : ''}${sortParams.sortBy}` : 'id',
        [API_FIELDS.search]: search,
        [API_FIELDS.statusIn]: '',
      },
    })
      .pipe(
        map(paginatedDataDto =>
          PaginatedDataMapper.fromDto<Anime, AnimeDTO>({
            dto: paginatedDataDto,
            resultMapper: AnimeMapper.fromDto,
          })),
      );
  }
}

/** Params for {getPaginatedAnimeList} method.*/
export interface GetPagintedAnimeListParams {

  /** Pagination params. */
  paginationParams: PaginationParams;

  /** Search. */
  search: string;

  /** Sort params. */
  sortParams: SortParams<AnimeSortField>;
}

const API_FIELDS = {
  offset: 'offset',
  limit: 'limit',
  order: 'ordering',
  search: 'search',
  statusIn: 'status__in',
};
