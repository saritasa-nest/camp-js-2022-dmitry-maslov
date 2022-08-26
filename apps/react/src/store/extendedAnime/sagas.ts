import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/react/api/services/animeService';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { isApiError } from '../../utils/axios-error-guard';
import { AnimeGenreActions } from '../animeGenre/dispatchers';
import { AnimeStudioActions } from '../animeStudio/dispatchers';

import { ExtendedAnimeActions } from './dispatchers';

/**
 * Worker fetch extended anime.
 * @param action Action.
 */
function* fetchExtendedAnimeWorker(
  action: ReturnType<typeof ExtendedAnimeActions.fetchExtendedAnime>,
): SagaIterator {
  try {
    const anime: Anime = yield call(
      AnimeService.getAnimeById,
      action.payload,
    );

    yield put(AnimeGenreActions.addGenres(anime.genresData));
    yield put(AnimeStudioActions.addStudios(anime.studiosData));

    yield put(ExtendedAnimeActions.fetchExtendedAnimeSuccess(anime));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(ExtendedAnimeActions.fetchExtendedAnimeFailure(appError));
    }
  }
}

/** Watcher saga for extended Anime. */
export function* extendedAnimeSaga(): SagaIterator {
  yield takeLatest(ExtendedAnimeActions.fetchExtendedAnime.type, fetchExtendedAnimeWorker);
}
