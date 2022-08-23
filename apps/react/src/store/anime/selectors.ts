import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeListEntityAdapter } from './state';

export const { selectAll } = animeListEntityAdapter.getSelectors();

export const selectAnimeList = createSelector(
  (state: RootState) => selectAll(state.animeList),
  animeList => animeList,
);

export const selectState = createSelector(
  (state: RootState) => state.animeList,
  state => state,
);
