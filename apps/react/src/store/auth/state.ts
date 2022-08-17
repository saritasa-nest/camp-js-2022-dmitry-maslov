import { AppError, AppValidationError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';

/** Auth state. */
export interface AuthState {

  /** Whether authentication is in process or not. */
  readonly isLoading: boolean;

  /** Error. */
  readonly error?: AppError | AppValidationError<Login> | AppValidationError<Registration>;

  /** User. */
  readonly isAuthorized: boolean;
}

export const initialState: AuthState = {
  isLoading: false,
  isAuthorized: false,
};
