import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppConfigService } from '../services/app-config.service';
import { UserService } from '../services/user.service';
import { catchHttpErrorResponse } from '../utils/rxjs/catch-http-error-response';

/** Interceptor handles requests with outdated tokens. */
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  /** Request to refresh token. */
  private refreshSecretRequest$: Observable<void> | null = null;

  public constructor(
    private readonly appConfigService: AppConfigService,
    private readonly userService: UserService,
  ) {}

  /**
   * Refreshes a token.
   * @inheritdoc
   */
  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchHttpErrorResponse(error => {
        if (error.status !== 401 || !this.shouldRefreshTokenForUrl(req.url)) {
          return throwError(() => error);
        }

        this.refreshSecretRequest$ ??= this.userService.refreshSecret();

        return this.refreshSecretRequest$.pipe(
          switchMap(() => next.handle(req)),
        );
      }),
    );
  }

  /**
   * Checks if a request is for authorization or refresh token.
   * @param url Request url.
   */
  private shouldRefreshTokenForUrl(url: string): boolean {
    const homeUrl = new URL('', this.appConfigService.apiUrl).toString();
    const isHomeRequest = url.startsWith(homeUrl);
    const isAuthRequest = url.startsWith(new URL('auth', homeUrl).toString());

    return isHomeRequest && !isAuthRequest;
  }
}
