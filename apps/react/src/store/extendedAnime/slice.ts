import { createSlice } from '@reduxjs/toolkit';

import { ExtendedAnimeActions } from './dispatchers';
import { extendedAnimeEntityAdapter, ExtendedAnimeState, initialState } from './state';

export const extendedAnimeSlice = createSlice({
  name: 'extendedAnime',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(ExtendedAnimeActions.fetchExtendedAnime, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(ExtendedAnimeActions.fetchExtendedAnimeSuccess, (state, action) => {
      extendedAnimeEntityAdapter.setOne(state as ExtendedAnimeState, action.payload);
      state.isLoading = false;
    })
    .addCase(ExtendedAnimeActions.fetchExtendedAnimeFailure, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }),
});
