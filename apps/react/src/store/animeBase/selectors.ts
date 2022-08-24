import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeBaseEntityAdapter } from './state';

export const { selectAll } = animeBaseEntityAdapter.getSelectors();

export const selectAnimeBaseList = createSelector(
  (state: RootState) => selectAll(state.animeBase),
  animeBase => animeBase,
);

export const selectAnimeBaseIsLoading = createSelector(
  (state: RootState) => state.animeBase.isLoading,
  isLoading => isLoading,
);

export const selectAnimeBaseIsResultEmpty = createSelector(
  (state: RootState) => state.animeBase.isResultEmpty,
  isResultEmpty => isResultEmpty,
);

export const selectState = createSelector(
  (state: RootState) => state.animeBase,
  state => state,
);
