import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { animeBaseEntityAdapter } from './state';

const { selectAll, selectById } = animeBaseEntityAdapter.getSelectors();

export const selectAnimeBaseList = createSelector(
  (state: RootState) => selectAll(state.anime),
  animeList => animeList,
);

export const selectAnimeBaseIsLoading = createSelector(
  (state: RootState) => state.anime.isLoading,
  isLoading => isLoading,
);

export const selectAnimeBaseIsResultEmpty = createSelector(
  (state: RootState) => state.anime.isResultEmpty,
  isResultEmpty => isResultEmpty,
);

export const selectState = createSelector(
  (state: RootState) => state.anime,
  state => state,
);

export const selectBaseAnimeById = (id: number) => createSelector(
  (state: RootState) => selectById(state.anime, id),
  anime => anime,
);
