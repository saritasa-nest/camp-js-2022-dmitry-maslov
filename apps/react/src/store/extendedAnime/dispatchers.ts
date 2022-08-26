import { AppError } from '@js-camp/core/models/app-error';
import { createAction } from '@reduxjs/toolkit';

import { ExtendedAnime } from './state';

export namespace ExtendedAnimeActions {
  export const fetchExtendedAnime = createAction<string | number>('extendedAnime/fetchExtendedAnime');

  export const fetchExtendedAnimeSuccess = createAction<ExtendedAnime>('extendedAnime/fetchExtendedAnimeSuccess');

  export const fetchExtendedAnimeFailure = createAction<AppError>('extendedAnime/fetchExtendedAnimeFailure');
}
