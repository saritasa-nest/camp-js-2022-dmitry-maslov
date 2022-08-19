import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { LoginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { UserSecretDataMapper } from '@js-camp/core/mappers/user-secret-data.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { UserSecret } from '@js-camp/core/models/user-secret';

import { http } from '..';

import { CONFIG } from '../config';

import { UserSecretStorageService } from './userSecretService';

export namespace AuthApi {
  const loginUrl = new URL('auth/login/', CONFIG.apiUrl);
  const registerUrl = new URL('auth/register/', CONFIG.apiUrl);
  const refreshSecretUrl = new URL('auth/token/refresh/', CONFIG.apiUrl);

  /** Refresh secret. */
  export async function refreshSecret(): Promise<void> {
    const userSecretDto = (await http.post<UserSecretDto>(refreshSecretUrl.toString())).data;
    const userSecret = UserSecretDataMapper.fromDto(userSecretDto);
    UserSecretStorageService.saveSecret(userSecret);
  }

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<UserSecret> {
    const userSecretDto = (
      await http.post<UserSecretDto>(
        loginUrl.toString(),
        LoginMapper.toDto(loginData),
      )
    ).data;
    return UserSecretDataMapper.fromDto(userSecretDto);
  }

  /**
   * Registration.
   * @param registrationData Registration data.
   */
  export async function register(
    registrationData: Registration,
  ): Promise<UserSecret> {
    const userSecretDto = (await http.post<UserSecretDto>(
      registerUrl.toString(),
      RegistrationMapper.toDto(registrationData),
    )).data;
    return UserSecretDataMapper.fromDto(userSecretDto);
  }
}
