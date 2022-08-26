import { Anime } from '@js-camp/core/models/anime';
import { createSelector } from '@reduxjs/toolkit';

import { selectBaseAnimeById } from '../anime/selectors';

import { selectAnimeGenresByAnimeId } from '../animeGenre/selectors';
import { selectAnimeStudiosByAnimeId } from '../animeStudio/selectors';

import { RootState } from '../store';

import { extendedAnimeEntityAdapter } from './state';

export const { selectById } = extendedAnimeEntityAdapter.getSelectors();

export const selectExtendedAnimeById = (id: number) =>
  createSelector(
    (state: RootState) => selectById(state.extendedAnime, id),
    anime => anime,
  );

export const selectFullAnimeById = (id: number) =>
  createSelector([
      selectBaseAnimeById(id),
      selectExtendedAnimeById(id),
      selectAnimeGenresByAnimeId(id),
      selectAnimeStudiosByAnimeId(id),
  ],
  (anime, extendedAnime, genresData, studiosData) => {
      if (anime === undefined || extendedAnime === undefined) {
        return undefined;
      }

      return new Anime({
        ...anime,
        ...extendedAnime,
        studiosData,
        genresData,
      });
    });
