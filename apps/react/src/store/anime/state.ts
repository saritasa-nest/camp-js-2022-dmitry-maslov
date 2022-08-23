import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeListEntityAdapter = createEntityAdapter<AnimeBase>({
  selectId: anime => anime.id,
});

interface State {

  /** Anime list is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;
}

export const initialState = animeListEntityAdapter.getInitialState<State>({
  isLoading: false,
});

export type AnimeState = typeof initialState;
