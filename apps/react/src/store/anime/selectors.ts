import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeEntityAdapter } from './state';

export const { selectAll } = animeEntityAdapter.getSelectors();

export const selectAnime = createSelector(
  (state: RootState) => selectAll(state.anime),
  animeList => animeList,
);
