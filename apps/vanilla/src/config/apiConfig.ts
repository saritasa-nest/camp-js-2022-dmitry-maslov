import { AxiosRequestConfig } from 'axios';

export const apiConfig: AxiosRequestConfig = {
  // TODO: Забрать из env
  baseURL: 'https://api.camp-js.saritasa.rocks/api/v1/anime',
  headers: {
    // TODO: Забрать из env
    'Api-Key': '519f134a-60a7-44de-83ef-7ef6badd9fda',
  },
};
