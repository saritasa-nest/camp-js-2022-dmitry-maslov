import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { Login } from '@js-camp/core/models/login';

/** Login form component. */
@Component({
  selector: 'camp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  /** Should show password. */
  public shouldShowPassword = true;

  /** Login form. */
  public loginForm = this.formBuilder.group<Login>({
    email: '',
    password: '',
  });

  /** Login. */
  public login(): void {
    this.userService.login({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    }).subscribe({
      next(v) {
        console.log('v', v);
      },
    });
  }

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
  ) {}
}
