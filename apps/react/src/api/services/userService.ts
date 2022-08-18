import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';

import { http } from '..';
import { CONFIG } from '../config';

import { AuthApi } from './authService';
import { UserSecretStorageService } from './userSecretService';

export namespace UserService {
  const getUserProfileUrl = new URL('users/profile/', CONFIG.apiUrl);

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<User> {
    const userSecret = await AuthApi.login(loginData);
    await UserSecretStorageService.saveSecret(userSecret);

    const user = await getUser();
    return user;
  }

  /** Get profile. */
  export async function getUser(): Promise<User> {
    const response = await http.get<UserDto>(getUserProfileUrl.toString());
    return UserMapper.fromDto(response.data);
  }

  /**
   * Register.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<User> {
    const userSecret = await AuthApi.register(registrationData);
    await UserSecretStorageService.saveSecret(userSecret);

    const user = await getUser();
    return user;
  }

  /** Logout. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.removeSecret();
  }
}
