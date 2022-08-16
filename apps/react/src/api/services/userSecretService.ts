import { UserSecret } from '@js-camp/core/models/user-secret';

import { LocalStorageService } from './localStorageService';

const USER_SECRET_KEY = 'user-secret';

export namespace UserSecretStorageService {

  /**
   * Save secret.
   * @param secret User secret.
   */
  export function saveSecret(secret: UserSecret): void {
    LocalStorageService.save(USER_SECRET_KEY, secret);
  }

  /** Remove secret. */
  export function removeSecret(): void {
    LocalStorageService.remove(USER_SECRET_KEY);
  }

  /** Get user secret. */
  export function getSecret(): UserSecret | null {
    return LocalStorageService.get(USER_SECRET_KEY);
  }
}
