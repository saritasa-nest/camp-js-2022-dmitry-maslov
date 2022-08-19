import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AppError } from '@js-camp/core/models/app-error';

/** Anime state. */
export interface AnimeState {

  /** Anime is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError;

  /** Anime list. */
  readonly animeList: readonly AnimeBase[];
}

export const initialState: AnimeState = {
  isLoading: false,
  animeList: [],
};
