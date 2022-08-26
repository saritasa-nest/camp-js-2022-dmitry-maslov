import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { AnimeService } from '@js-camp/react/api/services/animeService';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { isApiError } from '../../utils/axios-error-guard';

import { AnimeActions } from './dispatchers';

/**
 * Worker fetch first anime base items.
 * @param action Action.
 */
function* fetchAnimeBaseListWorker(
  action: ReturnType<typeof AnimeActions.fetchAnimeList>,
): SagaIterator {
  try {
    const animeBaseList: AnimeBase[] = yield call(
      AnimeService.getFirstAnimeBaseItems,
      action.payload,
    );
    yield put(AnimeActions.fetchAnimeListSuccess(animeBaseList));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AnimeActions.fetchAnimeListFailure(appError));
    }
  }
}

/** Worker fetch the next anime base items. */
function* fetchNextAnimeBaseListWorker(): SagaIterator {
  try {
    const animeBaseList: AnimeBase[] = yield call(AnimeService.getNextAnimeBaseItems);
    yield put(AnimeActions.fetchAnimeListSuccess(animeBaseList));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AnimeActions.fetchAnimeListFailure(appError));
    }
  }
}

/** Watcher saga for anime base. */
export function* animeSaga(): SagaIterator {
  yield takeLatest(AnimeActions.fetchAnimeList, fetchAnimeBaseListWorker);
  yield takeLatest(AnimeActions.fetchNextAnime, fetchNextAnimeBaseListWorker);
}
