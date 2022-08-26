import { createSlice } from '@reduxjs/toolkit';

import { AnimeStudioActions } from './dispatchers';
import { animeStudioEntityAdapter, AnimeStudioState, initialState } from './state';

export const animeStudioSlice = createSlice({
  name: 'animeStudio',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(AnimeStudioActions.addStudios, (state, action) => {
      animeStudioEntityAdapter.addMany(state as AnimeStudioState, action.payload);
    }),
});
