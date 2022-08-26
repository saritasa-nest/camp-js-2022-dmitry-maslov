import { AppError } from '@js-camp/core/models/app-error';
import { Studio } from '@js-camp/core/models/studio';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeStudioEntityAdapter = createEntityAdapter<Studio>({
  selectId: genre => genre.id,
});

interface State {

  /** Anime list is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;
}

export const initialState = animeStudioEntityAdapter.getInitialState<State>({
  isLoading: false,
});

export type AnimeStudioState = typeof initialState;
