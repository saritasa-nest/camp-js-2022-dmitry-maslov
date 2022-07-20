import { AxiosRequestConfig } from 'axios';

export const apiConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Api-Key': import.meta.env.VITE_API_KEY,
  },
};
