import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Guard prevents user from accessing if a user is not logged in. */
@Injectable({
  providedIn: 'root',
})
export class UnauthorizedGuard implements CanActivate, CanLoad {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canLoad(): Observable<boolean | UrlTree> {
    return this.canNavigate();
  }

  /** Determine if /auth route can be activated. */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.canNavigate();
  }

  private canNavigate(): Observable<boolean | UrlTree> {
    return this.userService.isAuthorized$.pipe(
      map(isAuthorized => (isAuthorized ? true : this.router.parseUrl('/'))),
      first(),
    );
  }
}
