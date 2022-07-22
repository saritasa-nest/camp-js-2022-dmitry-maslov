import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/** App-specific implementation of app config. */
@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  /** Api url. */
  public readonly apiUrl: string = environment.apiUrl;

  /** Api key. */
  public readonly apiKey: string = environment.apiKey;
}
