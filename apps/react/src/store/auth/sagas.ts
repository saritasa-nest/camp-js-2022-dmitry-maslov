import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { LoginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { UserService } from '../../api/services/userService';

import { isApiError } from '../../utils/axios-error-guard';

import { AuthActions } from './dispatchers';

/**
 * Worker saga which logs in the user.
 * @param action - Login action.
 */
function* loginUserWorker(
  action: ReturnType<typeof AuthActions.loginUser>,
): SagaIterator {
  try {
    yield call(UserService.login, action.payload);
    yield put(AuthActions.loginSuccess());
  } catch (error: unknown) {
    if (isApiError(error)) {
      console.log('hello');
      const appError = AppErrorMapper.fromDtoWithValidationSupport(
        error,
        LoginMapper.validationErrorFromDto,
      );
      yield put(AuthActions.loginFailure(appError));
    }

    throw error;
  }
}

/** Worker saga which logs out the user. */
function* logoutUserWorker(): SagaIterator {
  try {
    yield put(AuthActions.logoutSuccess());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDto(error);
      yield put(AuthActions.logoutFailure(appError));
    }
    throw error;
  }
}

/** Watcher saga for auth. */
export function* authSaga(): SagaIterator {
  yield takeLatest(AuthActions.loginUser.type, loginUserWorker);
  yield takeLatest(AuthActions.logoutUser.type, logoutUserWorker);
}
