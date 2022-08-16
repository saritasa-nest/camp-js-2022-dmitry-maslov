import { AppError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/login';
import { AxiosError } from 'axios';

import { AuthApi } from './authService';
import { UserSecretStorageService } from './userSecretService';

export namespace UserService {

  /**
   * Login.
   * @param loginData Login data.
   */
  export async function login(loginData: Login): Promise<void> {
    const userSecret = await AuthApi.login(loginData);
    UserSecretStorageService.saveSecret(userSecret);
  }

  export function logout() {
    UserSecretStorageService.removeSecret();
  }
}
