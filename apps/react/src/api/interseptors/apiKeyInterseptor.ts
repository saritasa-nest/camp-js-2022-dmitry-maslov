import { AxiosRequestConfig } from 'axios';

import { CONFIG } from '../config';

/**
 * Add api key interceptor.
 * @param config Axios config.
 */
export function addApiKeyBeforeRequest(config: AxiosRequestConfig): AxiosRequestConfig {
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
      'Api-Key': CONFIG.apiKey,
    },
  };
}
