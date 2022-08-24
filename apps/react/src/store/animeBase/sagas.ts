import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AnimeService } from '@js-camp/react/api/services/animeService';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { isApiError } from '../../utils/axios-error-guard';

import { AnimeBaseActions } from './dispatchers';

/**
 * Worker fetch first anime base items.
 * @param action Action.
 */
function* fetchAnimeBaseWorker(
  action: ReturnType<typeof AnimeBaseActions.fetchAnimeBase>,
): SagaIterator {
  try {
    const animeBaseList: AnimeBase[] = yield call(
      AnimeService.getFirstAnimeBaseItems,
      action.payload,
    );
    yield put(AnimeBaseActions.fetchAnimeBaseSuccess(animeBaseList));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AnimeBaseActions.fetchAnimeBaseFailure(appError));
    }
  }
}

/** Worker fetch the next anime base items. */
function* fetchNextAnimeBaseWorker(): SagaIterator {
  try {
    const animeBaseList: AnimeBase[] = yield call(AnimeService.getNextAnimeBaseItems);
    yield put(AnimeBaseActions.fetchAnimeBaseSuccess(animeBaseList));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AnimeBaseActions.fetchAnimeBaseFailure(appError));
    }
  }
}

/** Watcher saga for anime base. */
export function* animeBaseSaga(): SagaIterator {
  yield takeLatest(AnimeBaseActions.fetchAnimeBase, fetchAnimeBaseWorker);
  yield takeLatest(AnimeBaseActions.fetchNextAnimeBase, fetchNextAnimeBaseWorker);
}
