import { createSelector } from '@reduxjs/toolkit';

import { selectExtendedAnimeById } from '../extendedAnime/selectors';
import { RootState } from '../store';

import { animeStudioEntityAdapter } from './state';

const { selectAll, selectById } = animeStudioEntityAdapter.getSelectors();

export const selectAnimeStudios = createSelector(
  (state: RootState) => selectAll(state.animeStudio),
  studios => studios,
);

export const selectAnimeStudioById = (id: number) => createSelector(
  (state: RootState) => selectById(state.animeStudio, id),
  studio => studio,
);

export const selectAnimeStudiosByIds = (ids: readonly number[]) => createSelector(
  (state: RootState) => selectAll(state.animeStudio),
  studios => studios.filter(studio => ids.includes(studio.id)),
);

export const selectAnimeStudiosByAnimeId = (id: number) =>
  createSelector([
    selectAnimeStudios,
    selectExtendedAnimeById(id),
  ],
  (studios, extendedAnime) => extendedAnime === undefined ?
    [] :
      studios.filter(studio => extendedAnime.studios.includes(studio.id)));
