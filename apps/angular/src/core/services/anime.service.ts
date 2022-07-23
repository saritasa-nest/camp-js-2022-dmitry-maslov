import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { AnimeDTO } from '@js-camp/core/dtos/anime.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Anime } from '@js-camp/core/models/anime/anime';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { Pagination } from '@js-camp/core/models/pagination';

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
   * Method for getting anime list.
   */
  public getPaginatedAnimeList(): Observable<Pagination<Anime>> {
    return this.httpClient.get<PaginationDto<AnimeDTO>>(this.animeUrl.toString(), {
      params: {
        ordering: 'id',
      },
    }).pipe(
      map(paginatedDataDto => PaginationMapper.fromDto<Anime, AnimeDTO>(
        AnimeMapper.fromDto,
        paginatedDataDto,
      )),
    );

  }
}
