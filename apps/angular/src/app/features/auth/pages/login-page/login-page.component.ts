import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Login Page. */
@Component({
  selector: 'camp-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
