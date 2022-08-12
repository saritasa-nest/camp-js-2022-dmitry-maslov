import { map, Observable } from 'rxjs';
import { PaginatedDataMapper } from '@js-camp/core/mappers/paginated-data.mapper';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anime } from '@js-camp/core/models/anime';
import { PaginatedDataDto } from '@js-camp/core/dtos/paginated-data.dto';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';
import { AnimeFiltersMapper } from '@js-camp/core/mappers/anime-filters.mapper';

import { AnimeSortParams } from '../models/animeSortParams';
import { SortMapper } from '../mappers/sort-params.mapper';

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
   * @param PaginatedAnimeListParams {PaginatedAnimeListParams}.
   */
  public getPaginatedAnimeList({
    sortParams,
    paginationParams,
    filterParams,
  }: PaginatedAnimeListParams): Observable<PaginatedData<Anime>> {
    const { offset, limit } = PaginationParamsMapper.toDto(paginationParams);

    return this.httpClient.get<PaginatedDataDto<AnimeDTO>>(this.animeUrl.toString(), {
      params: {
        [API_FIELDS.offset]: offset,
        [API_FIELDS.limit]: limit,
        [API_FIELDS.order]: SortMapper.toDto(sortParams),
        [API_FIELDS.search]: filterParams.search,
        [API_FIELDS.typeIn]: AnimeFiltersMapper.filterTypeToDto(filterParams.type),
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

const API_FIELDS = {
  offset: 'offset',
  limit: 'limit',
  order: 'ordering',
  search: 'search',
  typeIn: 'type__in',
};

/** Params for {@link getPaginatedAnimeList} method.*/
export interface PaginatedAnimeListParams {

  /** Pagination params. */
  readonly paginationParams: PaginationParams;

  /** Anime Filters. */
  readonly filterParams: AnimeFilters;

  /** Sort params. */
  readonly sortParams: AnimeSortParams;
}
