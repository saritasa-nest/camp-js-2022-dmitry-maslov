import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { PaginatedData } from '@js-camp/core/models/pagination';
import { AnimeService } from '@js-camp/react/api/services/animeService';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { isApiError } from '../../utils/axios-error-guard';

import { AnimeListActions } from './dispatchers';

/**
 * Worker fetch the anime list.
 * @param action Action.
 */
function* fetchAnimeListWorker(
  action: ReturnType<typeof AnimeListActions.fetchAnimeList>,
): SagaIterator {
  try {
    const paginatedAnimeList: PaginatedData<AnimeBase> = yield call(
      AnimeService.getPaginatedAnimeList,
      action.payload,
    );
    yield put(AnimeListActions.fetchAnimeListSuccess(paginatedAnimeList.items));
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AnimeListActions.fetchAnimeListFailure(appError));
    }
  }
}

/** Watcher saga for animeList. */
export function* animeListSaga(): SagaIterator {
  yield takeLatest(AnimeListActions.fetchAnimeList, fetchAnimeListWorker);
}
