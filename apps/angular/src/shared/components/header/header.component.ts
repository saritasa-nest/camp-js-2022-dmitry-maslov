import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { first } from 'rxjs';

/** Header component. */
@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** Is Authorized. */
  public isAuthorized$ = this.userService.isAuthorized$;

  /** Handle logout. */
  public handleLogout(): void {
    this.userService.logout().pipe(first())
      .subscribe();
  }

  public constructor(private readonly userService: UserService) {}
}
