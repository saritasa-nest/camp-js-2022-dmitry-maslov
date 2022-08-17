import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { LoginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { UserService } from '../../api/services/userService';

import { isApiError } from '../../utils/axios-error-guard';

import { AuthActions } from './dispatchers';

/**
 * Worker saga which register the user.
 * @param action Registration action.
 */
function* registerUserWorker(
  action: ReturnType<typeof AuthActions.registerUser>,
): SagaIterator {
  try {
    yield call(UserService.register, action.payload);
    yield put(AuthActions.registerSuccess());
  } catch (error: unknown) {
    if (isApiError(error)) {
      const appError = AppErrorMapper.fromDtoWithValidationSupport(
        error,
        RegistrationMapper.validationErrorFromDto,
      );
      yield put(AuthActions.registerFailure(appError));
    }
  }
}

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
      const appError = AppErrorMapper.fromDtoWithValidationSupport(
        error.response,
        LoginMapper.validationErrorFromDto,
      );
      yield put(AuthActions.loginFailure(appError));
    }

    throw error;
  }
}

/** Worker saga which logs out the user. */
function* logoutUserWorker(): SagaIterator {
  yield call(UserService.logout);
  yield put(AuthActions.logoutSuccess());
}

/** Watcher saga for auth. */
export function* authSaga(): SagaIterator {
  yield takeLatest(AuthActions.loginUser.type, loginUserWorker);
  yield takeLatest(AuthActions.logoutUser.type, logoutUserWorker);
  yield takeLatest(AuthActions.registerUser.type, registerUserWorker);
}
