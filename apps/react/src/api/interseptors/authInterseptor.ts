import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';
import { UserSecretStorageService } from '../services/userSecretService';

/**
 * Add auth token interceptor.
 * @param config Axios config.
 */
export function addAuthTokenBeforeRequest(config: AxiosRequestConfig): AxiosRequestConfig {

  if (!shouldInterceptToken(config)) {
    return config;
  }

  const token = UserSecretStorageService.getSecret()?.accessToken;

  if (token == null) {
    return config;
  }

  const { headers } = config;

  if (headers == null) {
    throw new Error(
      'Axios did not pass any header. Please check your request.',
    );
  }

  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

/**
 * Checks if a request should be intercepted.
 * @param config - Request config.
 */
function shouldInterceptToken(config: AxiosRequestConfig): boolean {
  return config.baseURL?.startsWith(CONFIG.apiUrl) ?? false;
}
