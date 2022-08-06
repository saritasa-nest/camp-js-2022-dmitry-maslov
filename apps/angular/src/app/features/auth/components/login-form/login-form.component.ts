import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchHttpErrorResponse } from '@js-camp/angular/core/utils/rxjs/catch-http-error-response';
import { catchValidationData } from '@js-camp/angular/core/utils/rxjs/catch-validation-error';
import { Destroyable, takeUntilDestroy } from '@js-camp/angular/core/utils/rxjs/destroyable';
import { toggleExecutionState } from '@js-camp/angular/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, catchError, finalize, of, Subject, tap } from 'rxjs';

/** Login form component. */
@Destroyable()
@Component({
  selector: 'camp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private destroy$ = new Subject<boolean>();

  public isLoading$ = new BehaviorSubject<boolean>(false);

  /** Error message. */
  public error$ = new Subject<string>();

  /** Should show password. */
  public shouldShowPassword = true;

  /** Login form. */
  public loginForm = this.formBuilder.nonNullable.group({
    email: this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.formBuilder.nonNullable.control('', [Validators.required]),
  });

  /** Login. */
  public handleLogin(): void {
    if (this.loginForm.invalid) {
      return void 0;
    }

    this.error$.next('');

    this.userService.login({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    }).pipe(
      toggleExecutionState(this.isLoading$),
      catchValidationData(this.loginForm),
      takeUntilDestroy(this),
    )
      .subscribe({
        error(e: unknown) {
          console.log(e);
        },
      });
  }

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
  ) {}

}
