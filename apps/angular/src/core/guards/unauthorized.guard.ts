import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/** Guard prevents user from accessing if a user is not logged in. */
@Injectable({
  providedIn: 'root',
})
export class UnauthorizedGuard implements CanActivate {
  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  /** @inheritdoc */
  public canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.canNavigate(state);
  }

  private canNavigate(state: RouterStateSnapshot): Observable<boolean | UrlTree> {

    return this.userService.isAuthorized$.pipe(
      map(isAuthorized => {
        if (isAuthorized) {
          return true;
        }

        this.userService.setReturnUrl(state.url);

        return this.router.parseUrl('auth');
      }),
      first(),
    );
  }
}
