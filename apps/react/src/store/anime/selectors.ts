import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectAnime = createSelector(
  (state: RootState) => state.anime.animeList,
  animeList => animeList,
);
