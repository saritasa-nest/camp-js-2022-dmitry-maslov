import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@js-camp/angular/core/services/auth.service';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchHttpErrorResponse } from '@js-camp/angular/core/utils/rxjs/catch-http-error-response';
import { finalize, of, Subject } from 'rxjs';

/** Login form component. */
@Component({
  selector: 'camp-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnDestroy {
  private destroy$ = new Subject<boolean>();

  public isLoading$ = new Subject<boolean>();

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
    this.isLoading$.next(true);

    this.userService.login({
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    }).pipe(
      catchHttpErrorResponse((err: HttpErrorResponse) => {
        this.error$.next(err.error.detail);
        return of(err);
      }),
      finalize(() => this.isLoading$.next(false)),
    )
      .subscribe();
  }

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
