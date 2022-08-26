import { AppError } from '@js-camp/core/models/app-error';
import { Genre } from '@js-camp/core/models/genre';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const genreEntityAdapter = createEntityAdapter<Genre>({
  selectId: genre => genre.id,
});

interface State {

  /** Anime list is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;
}

export const initialState = genreEntityAdapter.getInitialState<State>({
  isLoading: false,
});

export type AnimeGenreState = typeof initialState;
