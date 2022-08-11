import { Injectable } from '@angular/core';
import { UserSecret } from '@js-camp/core/models/user-secret';
import {
  concat, defer, distinctUntilChanged, mapTo, Observable, race, ReplaySubject, shareReplay, tap,
} from 'rxjs';

import { LocalStorageService } from './local-storage.service';

const USER_SECRET_STORAGE_KEY = 'user';

/** User secret storage. */
@Injectable({ providedIn: 'root' })
export class UserSecretStorageService {
  /** Token info for current user. */
  public readonly currentSecret$: Observable<UserSecret | null>;

  /** Current user secret. */
  private readonly currentSecretValue$ =
    new ReplaySubject<UserSecret | null>(1);

  public constructor(private readonly storageService: LocalStorageService) {
    this.currentSecret$ = this.initCurrentSecretStream();
  }

  /**
   * Saves a secret.
   * @param secret Secret to save.
   */
  public saveSecret(
    secret: UserSecret,
  ): Observable<UserSecret> {
    return defer(() =>
      this.storageService.save(USER_SECRET_STORAGE_KEY, secret)).pipe(
      tap(() => this.currentSecretValue$.next(secret)),
      mapTo(secret),
    );
  }

  /** Removes current secret. */
  public removeSecret(): Observable<void> {
    return defer(() =>
      this.storageService.remove(USER_SECRET_STORAGE_KEY)).pipe(tap(() => this.currentSecretValue$.next(null)));
  }

  private initCurrentSecretStream(): Observable<UserSecret | null> {
    const secretChange$ = this.currentSecretValue$;
    const secretFromStorage$ = concat(
      defer(() =>
        this.storageService.get<UserSecret>(USER_SECRET_STORAGE_KEY)),
      secretChange$,
    ).pipe(distinctUntilChanged((x, y) => x?.accessToken === y?.accessToken));

    return race(secretFromStorage$, secretChange$).pipe(
      shareReplay({ refCount: true, bufferSize: 1 }),
    );
  }
}
