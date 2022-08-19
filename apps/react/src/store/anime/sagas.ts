import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AnimeService } from '@js-camp/react/api/services/animeService';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { isApiError } from '../../utils/axios-error-guard';

import { AnimeActions } from './dispatchers';

/**
 * Worker fetch the user.
 * @param action Action.
 */
function* fetchAnimeListWorker(
  action: ReturnType<typeof AnimeActions.fetchAnimeList>,
): SagaIterator {

  try {
    const paginatedAnimeList: readonly AnimeBase[] = yield call(AnimeService.getPaginatedAnimeList, action.payload);
    yield put(AnimeActions.fetchAnimeListSuccess(paginatedAnimeList));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AnimeActions.fetchAnimeListFailure(appError));
    }
  }
}

/** Watcher saga for auth. */
export function* animeSaga(): SagaIterator {
  yield takeLatest(AnimeActions.fetchAnimeList, fetchAnimeListWorker);
}
