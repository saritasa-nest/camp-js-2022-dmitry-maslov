import { Api } from 'axios-es6-class';

import { apiConfig } from '../config/apiConfig';

/**
 * Service for working with API authorization.
 */
export class AuthApi extends Api {
  public constructor() {
    super(apiConfig);
  }
}

export const authApi = new AuthApi();
