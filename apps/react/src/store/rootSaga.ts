import { all, call, spawn } from 'redux-saga/effects';

import { animeListSaga } from './anime/sagas';
import { authSaga } from './auth/sagas';

/** Root saga. */
export function* rootSaga() {
  const sagas = [authSaga, animeListSaga];

  yield all(sagas.map(saga => spawn(function* spawnFunction() {
    while (true) {
      try {
        yield call(saga);
        break;
      } catch (error: unknown) {
        console.error(error);
      }
    }
  })));
}
