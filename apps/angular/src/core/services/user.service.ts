import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { AppError } from '@js-camp/core/models/app-error';
import { Login } from '@js-camp/core/models/login';
import { Registration } from '@js-camp/core/models/registration';
import { User } from '@js-camp/core/models/user';
import {
  catchError,
  filter,
  finalize,
  first,
  map,
  mapTo,
  Observable,
  of,
  shareReplay,
  switchMap,
  switchMapTo,
  tap,
  throwError,
} from 'rxjs';

import { AppConfigService } from './app-config.service';
import { AuthService } from './auth.service';
import { UserSecretStorageService } from './user-secret-storage.service';

/** Stateful service for storing/managing information about the current user. */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  /** Current user. Null when user is not logged in. */
  public readonly currentUser$: Observable<User | null>;

  /** Whether the user is authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  private readonly currentUserUrl: URL;

  public constructor(
    appConfig: AppConfigService,
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly userSecretStorage: UserSecretStorageService,
  ) {
    this.currentUserUrl = new URL('users/profile/', appConfig.apiUrl);
    this.currentUser$ = this.initCurrentUserStream();
    this.isAuthorized$ = this.currentUser$.pipe(map(user => user != null));
  }

  /** Update user secret, supposed to be called when user data is outdated. */
  public refreshSecret(): Observable<void> {
    return this.userSecretStorage.currentSecret$.pipe(
      first(),
      switchMap(secret =>
        secret != null ?
          this.authService.refreshSecret(secret) :
          throwError(() => new AppError('Unauthorized'))),

      // In case token is invalid clear the storage and redirect to login page
      catchError((error: unknown) =>
        this.userSecretStorage
          .removeSecret()
          .pipe(
            switchMapTo(this.navigateToAuthPage()),
            switchMapTo(throwError(() => error)),
          )),
      switchMap(newSecret => this.userSecretStorage.saveSecret(newSecret)),
      mapTo(void 0),
    );
  }

  /** Logout current user. */
  public logout(): Observable<void> {
    return this.userSecretStorage
      .removeSecret()
      .pipe(finalize(() => this.navigateToAuthPage()));
  }

  /**
   * Register.
   * @param registrationData Registration data.
   */
  public register(registrationData: Registration): Observable<unknown> {
    return this.authService.register(registrationData).pipe(
      switchMap(secret => this.userSecretStorage.saveSecret(secret)),
      switchMap(() => this.isAuthorized$),
      filter(isAuthorized => isAuthorized),
      tap(() => this.redirectAfterAuthorization()),
    );
  }

  /**
   * Login a user with email and password.
   * @param loginData Login data.
   */
  public login(loginData: Login): Observable<unknown> {
    return this.authService.login(loginData).pipe(
      switchMap(secret => this.userSecretStorage.saveSecret(secret)),
      switchMapTo(this.isAuthorized$),

      filter(isAuthorized => isAuthorized),
      tap(() => this.redirectAfterAuthorization()),
    );
  }

  private async redirectAfterAuthorization(): Promise<void> {
    const DEFAULT_REDIRECT_URL = '/';
    const route = this.router.createUrlTree([DEFAULT_REDIRECT_URL]);
    await this.router.navigateByUrl(route);
  }

  private async navigateToAuthPage(): Promise<void> {
    await this.router.navigate(['/auth']);
  }

  private getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<UserDto>(this.currentUserUrl.toString())
      .pipe(map(user => UserMapper.fromDto(user)));
  }

  private initCurrentUserStream(): Observable<User | null> {
    return this.userSecretStorage.currentSecret$.pipe(
      switchMap(secret => (secret ? this.getCurrentUser() : of(null))),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
  }
}
