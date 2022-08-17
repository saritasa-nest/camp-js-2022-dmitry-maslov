import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';

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

  /**
   * Register.
   * @param registrationData Registration data.
   */
  export async function register(registrationData: Registration): Promise<void> {
    const userSecret = await AuthApi.register(registrationData);
    UserSecretStorageService.saveSecret(userSecret);
  }

  /** Logout. */
  export async function logout(): Promise<void> {
    await UserSecretStorageService.removeSecret();
  }

}
