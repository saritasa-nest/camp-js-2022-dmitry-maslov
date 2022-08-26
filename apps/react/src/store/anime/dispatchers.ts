import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { AnimeListParams } from '@js-camp/react/api/services/animeService';
import { createAction } from '@reduxjs/toolkit';

export namespace AnimeActions {
  export const fetchAnimeList = createAction<AnimeListParams>('animeList/animeList');

  export const fetchAnimeListFailure = createAction<AppError>('animeList/animeListFailure');

  export const fetchAnimeListSuccess = createAction<readonly AnimeBase[]>('animeList/animeListSuccess');

  export const fetchNextAnime = createAction('animeList/animeNext');

  export const fetchNextAnimeFailure = createAction<AppError>('animeList/animeNextFailure');

  export const fetchNextAnimeSuccess = createAction<readonly AnimeBase[]>('animeList/animeNextSuccess');

  export const clearAnime = createAction('animeList/clearList');
}
