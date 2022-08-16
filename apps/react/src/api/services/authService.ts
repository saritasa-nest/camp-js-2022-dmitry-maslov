import { AppErrorMapper } from '@js-camp/core/mappers/app-error.mapper';
import { LoginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { AppError, AppValidationError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/login';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { AxiosError } from 'axios';

import { http } from '..';

import { CONFIG } from '../config';

export namespace AuthApi {
  const loginUrl = new URL('auth/login/', CONFIG.apiUrl);
  const registerUrl = new URL('auth/register/', CONFIG.apiUrl);
  const refreshSecretUrl = new URL('auth/token/refresh/', CONFIG.apiUrl);

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<UserSecret> {
    return (
      await http.post<UserSecret>(
        loginUrl.toString(),
        LoginMapper.toDto(loginData),
      )
    ).data;
  }
}
