import { Genre } from '@js-camp/core/models/genre';
import { createAction } from '@reduxjs/toolkit';

export namespace AnimeGenreActions {
  export const addGenres = createAction<readonly Genre[]>('animeGenre/addGenres');
}
