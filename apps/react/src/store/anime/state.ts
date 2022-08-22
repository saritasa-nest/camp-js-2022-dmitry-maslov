import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';
import { createEntityAdapter } from '@reduxjs/toolkit';

export const animeEntityAdapter = createEntityAdapter<AnimeBase>({
  selectId: anime => anime.id,
});

/** Anime state. */
interface IAnimeState {

  /** Anime is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;
}

export const initialState = animeEntityAdapter.getInitialState<IAnimeState>({
  isLoading: false,
});

export type AnimeState = typeof initialState;
