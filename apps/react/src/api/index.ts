import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { addApiKeyBeforeRequest } from './interseptors/apiKeyInterseptor';
import { addAuthTokenBeforeRequest } from './interseptors/authInterseptor';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
});

http.interceptors.request.use(addApiKeyBeforeRequest);
http.interceptors.request.use(addAuthTokenBeforeRequest);

// http.interceptors.response.use(response => response, refreshTokenBeforeResponse);
