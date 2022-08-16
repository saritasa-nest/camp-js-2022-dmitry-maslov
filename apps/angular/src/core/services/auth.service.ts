import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSecretDto } from '@js-camp/core/dtos/user-secret.dto';
import { LoginMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { UserSecretDataMapper } from '@js-camp/core/mappers/user-secret-data.mapper';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { UserSecret } from '@js-camp/core/models/user-secret';
import { map, Observable } from 'rxjs';

import { AppErrorMapper } from '../mappers/app-error.mapper';

import { AppConfigService } from './app-config.service';

const AUTH_PREFIX = 'Bearer';

/** Anime service. */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl: URL;

  private readonly registerUrl: URL;

  private readonly refreshSecretUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
  ) {
    this.registerUrl = new URL('auth/register/', appConfig.apiUrl);
    this.loginUrl = new URL('auth/login/', appConfig.apiUrl);
    this.refreshSecretUrl = new URL('auth/token/refresh/', appConfig.apiUrl);
  }

  /**
   * Register new user.
   * @param registrationData Registration data.
   */
  public register(registrationData: Registration): Observable<UserSecret> {
    return this.httpClient.post<UserSecretDto>(this.registerUrl.toString(), {
      ...RegistrationMapper.toDto(registrationData),
    })
      .pipe(
        map(dto => UserSecretDataMapper.fromDto(dto)),
        AppErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(RegistrationMapper.validationErrorFromDto),
      );
  }

  /**
   * Refresh user secret.
   * @param secret Secret data.
   */
  public refreshSecret(secret: UserSecret): Observable<UserSecret> {
    return this.httpClient.post<UserSecretDto>(this.refreshSecretUrl.toString(), {
      refresh: UserSecretDataMapper.toDto(secret).refresh,
    })
      .pipe(
        map(refreshedSecret =>
          UserSecretDataMapper.fromDto({
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
    return headers.set('Authorization', `${AUTH_PREFIX} ${userSecret.accessToken}`);
  }

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<UserSecret> {
    return this.httpClient.post<UserSecretDto>(
      this.loginUrl.toString(),
      LoginMapper.toDto(loginData),
    )
      .pipe(
        map(dto => UserSecretDataMapper.fromDto(dto)),
        AppErrorMapper.catchHttpErrorToAppErrorWithValidationSupport(
          LoginMapper.validationErrorFromDto,
        ),
      );
  }
}
