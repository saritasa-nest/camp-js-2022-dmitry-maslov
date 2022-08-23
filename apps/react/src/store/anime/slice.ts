import { createSlice } from '@reduxjs/toolkit';

import { AnimeActions } from './dispatchers';
import { animeEntityAdapter, AnimeState, initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AnimeActions.fetchAnimeList, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AnimeActions.fetchAnimeListSuccess, (state, action) => {
      animeEntityAdapter.addMany(state as AnimeState, action.payload);
      state.isLoading = false;
    })
    .addCase(AnimeActions.fetchAnimeListFailure, (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    }),
});