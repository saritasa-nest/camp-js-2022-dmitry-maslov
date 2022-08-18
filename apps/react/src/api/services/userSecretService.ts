import { UserSecret } from '@js-camp/core/models/user-secret';

import { LocalStorageService } from './localStorageService';

const USER_SECRET_KEY = 'user-secret';

export namespace UserSecretStorageService {

  /**
   * Save secret.
   * @param secret User secret.
   */
  // eslint-disable-next-line require-await
  export async function saveSecret(secret: UserSecret): Promise<void> {
    LocalStorageService.save(USER_SECRET_KEY, secret);
  }

  /** Remove secret. */
  // eslint-disable-next-line require-await
  export async function removeSecret(): Promise<void> {
    LocalStorageService.remove(USER_SECRET_KEY);
  }

  /** Get user secret. */
  export function getSecret(): UserSecret | null {
    return LocalStorageService.get(USER_SECRET_KEY);
  }
}
