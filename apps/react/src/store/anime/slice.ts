import { createSlice } from '@reduxjs/toolkit';

import { AnimeActions } from './dispatchers';
import { animeBaseEntityAdapter, AnimeBaseState, initialState } from './state';

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AnimeActions.fetchAnimeList, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AnimeActions.fetchAnimeListFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(AnimeActions.fetchAnimeListSuccess, (state, action) => {
      state.isResultEmpty = action.payload.length === 0;
      animeBaseEntityAdapter.addMany(state as AnimeBaseState, action.payload);
      state.isLoading = false;
    })
    .addCase(AnimeActions.fetchNextAnime, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AnimeActions.fetchNextAnimeSuccess, (state, action) => {
      state.isResultEmpty = action.payload.length === 0;
      animeBaseEntityAdapter.addMany(state as AnimeBaseState, action.payload);
      state.isLoading = false;
    })
    .addCase(AnimeActions.fetchNextAnimeFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(AnimeActions.clearAnime, state => {
      animeBaseEntityAdapter.removeAll(state as AnimeBaseState);
    }),
});
