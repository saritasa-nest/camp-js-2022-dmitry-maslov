import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { loginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { UserSecretDataMapper } from '@js-camp/core/mappers/user-secret-data.mapper';
import { Login } from '@js-camp/core/models/login';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { map, Observable } from 'rxjs';

import { AppConfigService } from './app-config.service';

const AUTH_PREFIX = 'Bearer';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl: URL;

  private refreshSecretUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
  ) {
    this.loginUrl = new URL('auth/login/', appConfig.apiUrl);
    this.refreshSecretUrl = new URL('auth/token/refresh/', appConfig.apiUrl);
  }

  /**
   * Refresh user's secret.
   * @param secret Secret data.
   */
  public refreshSecret(secret: UserSecret): Observable<UserSecret> {

    return this.httpClient
      .post<UserSecretDto>(
      this.refreshSecretUrl.toString(), {
        refresh: UserSecretDataMapper.toDto(secret).refresh,
      },
    )
      .pipe(
        map(refreshedSecret =>
          UserSecretDataMapper.fromDto({
            ...secret,
            ...refreshedSecret,
          })),
      );
  }

  /**
   * Appends authorization header to a list of `headers`.
   * @param headers Headers list.
   * @param userSecret User secret.
   */
  public appendAuthorizationHeader(
    headers: HttpHeaders,
    userSecret: UserSecret,
  ): HttpHeaders {
    return headers.set('Authorization', `${AUTH_PREFIX} ${userSecret.access}`);
  }

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<UserSecret> {
    return this.httpClient
      .post<UserSecretDto>(
      this.loginUrl.toString(),
      loginMapper.toDto(loginData),
    )
      .pipe(map(dto => UserSecretDataMapper.fromDto(dto)));
  }
}
