import { createSlice } from '@reduxjs/toolkit';

import { AnimeBaseActions } from './dispatchers';
import { animeBaseEntityAdapter, AnimeBaseState, initialState } from './state';

export const animeBaseSlice = createSlice({
  name: 'animeBase',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AnimeBaseActions.fetchAnimeBase, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AnimeBaseActions.fetchAnimeBaseFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(AnimeBaseActions.fetchAnimeBaseSuccess, (state, action) => {
      state.isResultEmpty = action.payload.length === 0;
      animeBaseEntityAdapter.addMany(state as AnimeBaseState, action.payload);
      state.isLoading = false;
    })
    .addCase(AnimeBaseActions.fetchNextAnimeBase, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AnimeBaseActions.fetchNextAnimeBaseSuccess, (state, action) => {
      state.isResultEmpty = action.payload.length === 0;
      animeBaseEntityAdapter.addMany(state as AnimeBaseState, action.payload);
      state.isLoading = false;
    })
    .addCase(AnimeBaseActions.fetchNextAnimeBaseFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase(AnimeBaseActions.clearAnime, state => {
      animeBaseEntityAdapter.removeAll(state as AnimeBaseState);
    }),
});
