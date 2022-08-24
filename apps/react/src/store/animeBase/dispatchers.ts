import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { AnimeListParams } from '@js-camp/react/api/services/animeService';
import { createAction } from '@reduxjs/toolkit';

export namespace AnimeBaseActions {
  export const fetchAnimeBase = createAction<AnimeListParams>('animeList/animeBase');

  export const fetchAnimeBaseFailure = createAction<AppError>('animeList/animeBaseFailure');

  export const fetchAnimeBaseSuccess = createAction<readonly AnimeBase[]>('animeList/animeBaseSuccess');

  export const fetchNextAnimeBase = createAction('animeList/animeNextBase');

  export const fetchNextAnimeBaseFailure = createAction<AppError>('animeList/animeNextBaseFailure');

  export const fetchNextAnimeBaseSuccess = createAction<readonly AnimeBase[]>('animeList/animeNextBaseSuccess');

  export const clearAnime = createAction('animeList/clearList');
}
