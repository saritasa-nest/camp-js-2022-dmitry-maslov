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
import { map, Observable } from 'rxjs';

import { AnimeSortField } from '@js-camp/core/enums/anime/sort';

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
   * @param paginationParams Pagination params.
   * @param search Search params.
   * @param sortParams Sort params.
   */
  public getPaginatedAnimeList(
    paginationParams: PaginationParams,
    search: string,
    sortParams: SortParams<AnimeSortField>,
  ): Observable<PaginatedData<Anime>> {
    const { offset, limit } = PaginationParamsMapper.toDto(paginationParams);

    return this.httpClient
      .get<PaginatedDataDto<AnimeDTO>>(this.animeUrl.toString(), {
      params: {
        offset,
        limit,
        ordering: sortParams.direction ? `${sortParams.direction === 'desc' ? '-' : ''}${sortParams.sortBy}` : 'id',
        search,
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
