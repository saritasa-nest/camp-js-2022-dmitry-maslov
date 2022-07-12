import { Api } from 'axios-es6-class';

import { apiConfig } from './../config/apiConfig';

/**
 * Main api service.
 */
export class ApiService extends Api {
  public constructor() {
    super(apiConfig);
  }
}
