import { AppError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/login';
import { createAction } from '@reduxjs/toolkit';

export namespace AuthActions {
  export const loginUser = createAction<Login>('auth/login');

  export const loginSuccess = createAction('auth/loginSuccess');

  export const loginFailure = createAction<AppError>('auth/loginFailure');

  export const logoutUser = createAction('auth/logout');

  export const logoutSuccess = createAction('auth/logoutSuccess');

  export const logoutFailure = createAction<AppError>('auth/logoutFailure');
}
