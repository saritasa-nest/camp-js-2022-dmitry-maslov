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
   * @param paginationParams {PaginationParams}.
   */
  public getPaginatedAnimeList(paginationParams: PaginationParams): Observable<PaginatedData<Anime>> {

    const { offset, limit } = PaginationParamsMapper.toDto(paginationParams);

    return this.httpClient.get<PaginatedDataDto<AnimeDTO>>(this.animeUrl.toString(), {
      params: {
        offset,
        limit,
        ordering: 'id',
      },
    }).pipe(
      map(paginatedDataDto => PaginatedDataMapper.fromDto<Anime, AnimeDTO>({
        dto: paginatedDataDto,
        paginationParams,
        resultMapper: AnimeMapper.fromDto,
      })),
    );
  }
}
