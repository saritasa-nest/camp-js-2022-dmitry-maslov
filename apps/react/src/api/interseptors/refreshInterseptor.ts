import { AxiosError } from 'axios';

import { CONFIG } from '../config';
import { AuthApi } from '../services/authService';
import { UserSecretStorageService } from '../services/userSecretService';

/**
 * Checks if a request is for authorization or refresh token.
 * @param url Request url.
 */
function shouldRefreshTokenForUrl(url: string): boolean {
  const homeUrl = new URL('', CONFIG.apiUrl).toString();
  const isHomeRequest = url.startsWith(homeUrl);
  const isAuthRequest = url.startsWith(new URL('auth', homeUrl).toString());
  return isHomeRequest && !isAuthRequest;
}

/**
 * Interceptor to append token to requests.
 * @param error Error.
 */
export const refreshTokenBeforeResponse = async(error: AxiosError): Promise<never> => {
  if (error.response == null) {
    throw new Error('failed response');
  }

  if (error.response.config.url == null) {
    throw new Error('failed response');
  }

  if (error.response.status !== 401 || shouldRefreshTokenForUrl(error.response.config.url)) {
    throw error;
  }

  if (UserSecretStorageService.getSecret() !== null) {
    try {
      await AuthApi.refreshSecret();
    } catch {
      UserSecretStorageService.removeSecret();
    }
  }

  return Promise.reject(error);
};
