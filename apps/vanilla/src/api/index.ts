import { CONFIG } from './../../../react/src/api/config';
import axios, { AxiosInstance } from 'axios';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl
});

