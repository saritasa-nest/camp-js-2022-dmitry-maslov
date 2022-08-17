import { LoginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { UserSecret } from '@js-camp/core/models/user-secret';

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

  /**
   * Registration.
   * @param registrationData Registration data.
   */
  export async function register(
    registrationData: Registration,
  ): Promise<UserSecret> {
    return (await http.post(
      registerUrl.toString(),
      RegistrationMapper.toDto(registrationData),
    )).data;
  }
}
