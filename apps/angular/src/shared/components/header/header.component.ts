import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Destroyable, takeUntilDestroy } from '@js-camp/angular/core/utils/rxjs/destroyable';
import { first } from 'rxjs';

/** Header component. */
@Destroyable()
@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** Is Authorized. */
  public readonly isAuthorized$ = this.userService.isAuthorized$;

  /** Handle logout. */
  public handleLogout(): void {
    this.userService.logout()
      .pipe(
        first(),
        takeUntilDestroy(this),
      )
      .subscribe();
  }

  public constructor(private readonly userService: UserService) {}
}
