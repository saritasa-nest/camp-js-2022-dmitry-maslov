import { Genre } from '@js-camp/core/models/genre';
import { createSelector } from '@reduxjs/toolkit';

import { selectExtendedAnimeById } from '../extendedAnime/selectors';

import { RootState } from '../store';

import { genreEntityAdapter } from './state';

const { selectAll, selectById } = genreEntityAdapter.getSelectors();

export const selectAnimeGenres = createSelector(
  (state: RootState) => selectAll(state.animeGenre),
  genres => genres,
);

export const selectAnimeGenreById = (id: number) =>
  createSelector(
    (state: RootState) => selectById(state.animeGenre, id),
    genre => genre,
  );

export const selectAnimeGenresByIds = (ids: readonly number[]) =>
  createSelector(
    (state: RootState) => selectAll(state.animeGenre),
    genres => genres.filter(genre => ids.includes(genre.id)),
  );

export const selectAnimeGenresByAnimeId = (id: number) =>
  createSelector([
    selectAnimeGenres,
    selectExtendedAnimeById(id),
  ],
  (genres, extendedAnime) =>
      extendedAnime === undefined ?
        [] :
        genres.filter(genre => extendedAnime.genres.includes(genre.id)));
