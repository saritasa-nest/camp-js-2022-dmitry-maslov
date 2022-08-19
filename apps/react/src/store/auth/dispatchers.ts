import { AppError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';
import { createAction } from '@reduxjs/toolkit';

export namespace AuthActions {
  export const loginUser = createAction<Login>('auth/login');

  export const loginFailure = createAction<AppError>('auth/loginFailure');

  export const logoutUser = createAction('auth/logout');

  export const logoutSuccess = createAction('auth/logoutSuccess');

  export const registerUser = createAction<Registration>('auth/register');

  export const registerFailure = createAction<AppError>('auth/registerFailure');

  export const resetAuthErrorAndLoading = createAction('auth/resetErrors');

  export const fetchUser = createAction('auth/user');

  export const fetchUserSuccess = createAction<User>('auth/userSuccess');

  export const fetchUserFailure = createAction<AppError>('auth/userErrors');
}
