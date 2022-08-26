import { Anime } from '@js-camp/core/models/anime';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { createEntityAdapter } from '@reduxjs/toolkit';

export type ExtendedAnime = Omit<
  Anime,
  keyof Omit<AnimeBase, 'id'> | 'genresData' | 'studiosData'
>;

export const extendedAnimeEntityAdapter = createEntityAdapter<ExtendedAnime>({
  selectId: extendedAnime => extendedAnime.id,
});

interface State {

  /** Anime list is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;
}

export const initialState = extendedAnimeEntityAdapter.getInitialState<State>({
  isLoading: false,
});

export type ExtendedAnimeState = typeof initialState;
