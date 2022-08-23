import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { PaginatedAnimeListParams } from '@js-camp/react/api/services/animeService';
import { createAction } from '@reduxjs/toolkit';

export namespace AnimeListActions {
  export const fetchAnimeList = createAction<PaginatedAnimeListParams>('animeList/animeList');

  export const fetchAnimeListFailure = createAction<AppError>('animeList/animeListFailure');

  export const fetchAnimeListSuccess = createAction<readonly AnimeBase[]>('animeList/animeListSuccess');
}
