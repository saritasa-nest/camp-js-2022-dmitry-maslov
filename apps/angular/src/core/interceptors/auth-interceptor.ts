import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

import { AppConfigService } from '../services/app-config.service';
import { AuthService } from '../services/auth.service';
import { UserSecretStorageService } from '../services/user-secret-storage.service';

/** Interceptor to add access token to requests using Authorization HTTP header. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userSecretStorage: UserSecretStorageService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Appends bearer token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptToken(req.url)) {
      const userSecret$ = this.userSecretStorage.currentSecret$.pipe(first());
      return userSecret$.pipe(
        map(userSecret =>
          userSecret ?
            req.clone({
              headers: this.authService.appendAuthorizationHeader(
                req.headers,
                userSecret,
              ),
            }) :
            req),
        switchMap(newReq => next.handle(newReq)),
      );
    }
    return next.handle(req);
  }

  /**
   * Checks if a request is for authorization or refresh token.
   * @param url - Request url.
   */
  private shouldInterceptToken(url: string): boolean {
    return url.startsWith(this.appConfigService.apiUrl);
  }
}
