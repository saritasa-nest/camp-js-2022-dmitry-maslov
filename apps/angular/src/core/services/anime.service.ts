import { map, Observable, tap } from 'rxjs';
import { PaginatedDataMapper } from '@js-camp/core/mappers/paginated-data.mapper';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { PaginatedDataDto } from '@js-camp/core/dtos/paginated-data.dto';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { PaginationParamsMapper } from '@js-camp/core/mappers/pagination-params.mapper';
import { AnimeFilters } from '@js-camp/core/models/anime-filters';
import { AnimeFiltersMapper } from '@js-camp/core/mappers/anime-filters.mapper';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeSortParams } from '../models/animeSortParams';
import { AnimeSortMapper } from '../mappers/animeSortParams.mapper';

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
   * Get anime.
   * @param id Anime id.
   */
  public getAnime(id: number): Observable<Anime> {
    return this.httpClient
      .get<AnimeDTO>(`${this.animeUrl.toString()}${id}/`)
      .pipe(map(animeDto => AnimeMapper.fromDtoToAnime(animeDto)));
  }

  /**
   * Method for getting paginated anime list.
   * @param PaginatedAnimeListParams {PaginatedAnimeListParams}.
   */
  public getPaginatedAnimeList({
    sortParams,
    paginationParams,
    filterParams,
  }: PaginatedAnimeListParams): Observable<PaginatedData<AnimeBase>> {
    const { offset, limit } = PaginationParamsMapper.toDto(paginationParams);

    return this.httpClient
      .get<PaginatedDataDto<AnimeDTO>>(this.animeUrl.toString(), {
      params: {
        [API_FIELDS.offset]: offset,
        [API_FIELDS.limit]: limit,
        [API_FIELDS.order]: AnimeSortMapper.toDto(sortParams),
        [API_FIELDS.search]: filterParams.search,
        [API_FIELDS.typeIn]: AnimeFiltersMapper.filterTypeToDto(
          filterParams.type,
        ),
      },
    })
      .pipe(
        map(paginatedDataDto =>
          PaginatedDataMapper.fromDto<AnimeBase, AnimeDTO>({
            dto: paginatedDataDto,
            resultMapper: AnimeMapper.fromDtoToAnimeBase,
          })),
      );
  }
}

/** Params for {getPaginatedAnimeList} method.*/
export interface PaginatedAnimeListParams {

  /** Pagination params. */
  paginationParams: PaginationParams;

  /** Anime Filters. */
  filterParams: AnimeFilters;

  /** Sort params. */
  sortParams: AnimeSortParams;
}

const API_FIELDS = {
  offset: 'offset',
  limit: 'limit',
  order: 'ordering',
  search: 'search',
  typeIn: 'type__in',
};
