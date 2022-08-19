import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { PaginatedAnimeListParams } from '@js-camp/react/api/services/animeService';
import { createAction } from '@reduxjs/toolkit';

export namespace AnimeActions {
  export const fetchAnimeList = createAction<PaginatedAnimeListParams>('anime/animeList');

  export const fetchAnimeListFailure = createAction<AppError>('anime/animeListFailure');

  export const fetchAnimeListSuccess = createAction<readonly AnimeBase[]>('anime/animeListSuccess');
}
