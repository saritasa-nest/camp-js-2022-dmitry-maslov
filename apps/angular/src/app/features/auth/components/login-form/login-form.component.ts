import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchValidationData } from '@js-camp/angular/core/utils/rxjs/catch-validation-error';
import {
  Destroyable,
  takeUntilDestroy,
} from '@js-camp/angular/core/utils/rxjs/destroyable';
import { toggleExecutionState } from '@js-camp/angular/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject } from 'rxjs';

/** Login form component. */
@Destroyable()
@Component({
  selector: 'camp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  /** Is loading. */
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  /** Should show password. */
  public shouldShowPassword = true;

  /** Login form. */
  public readonly loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
  ) {}

  /** Login. */
  public onLogin(): void {
    if (this.loginForm.invalid) {
      return void 0;
    }

    this.userService
      .login({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      })
      .pipe(
        toggleExecutionState(this.isLoading$),
        catchValidationData(this.loginForm),
        takeUntilDestroy(this),
      )
      .subscribe({
        error: () => {
            this.loginForm.setErrors({
              login: 'Wrong email or password',
            });
          },
      });
  }
}