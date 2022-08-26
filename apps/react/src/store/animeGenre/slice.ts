import { createSlice } from '@reduxjs/toolkit';

import { AnimeGenreActions } from './dispatchers';
import { genreEntityAdapter, AnimeGenreState, initialState } from './state';

export const animeGenreSlice = createSlice({
  name: 'animeGenre',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AnimeGenreActions.addGenres, (state, action) => {
      genreEntityAdapter.addMany(state as AnimeGenreState, action.payload);
    }),
});
