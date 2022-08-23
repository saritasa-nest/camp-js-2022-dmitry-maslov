import { createSlice } from '@reduxjs/toolkit';

import { AnimeListActions } from './dispatchers';
import { animeListEntityAdapter, AnimeState, initialState } from './state';

export const animeListSlice = createSlice({
  name: 'animeList',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AnimeListActions.fetchAnimeList, state => {
      state.error = undefined;
      state.isLoading = true;
    })
    .addCase(AnimeListActions.fetchAnimeListSuccess, (state, action) => {
      animeListEntityAdapter.addMany(state as AnimeState, action.payload);
      state.isLoading = false;
    })
    .addCase(AnimeListActions.fetchAnimeListFailure, (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    }),
});
