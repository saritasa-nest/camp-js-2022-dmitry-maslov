import { all, call, spawn } from 'redux-saga/effects';

import { authSaga } from './auth/sagas';

/** Root saga. */
export function* rootSaga() {
  const sagas = [authSaga];

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
