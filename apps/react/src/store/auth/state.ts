import { AppError } from '@js-camp/core/models/app-error';
import { ValidationError } from 'yup';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError | ValidationError;

  /** User. */
  readonly isAuthorized: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthorized: false,
};
