import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '@js-camp/angular/core/services/user.service';
import { catchHttpErrorResponse } from '@js-camp/angular/core/utils/rxjs/catch-http-error-response';
import { catchValidationData } from '@js-camp/angular/core/utils/rxjs/catch-validation-error';
import { Destroyable, takeUntilDestroy } from '@js-camp/angular/core/utils/rxjs/destroyable';
import { toggleExecutionState } from '@js-camp/angular/core/utils/rxjs/toggle-execution-state';
import { BehaviorSubject, catchError, EMPTY, finalize, first, map, of, Subject, tap } from 'rxjs';

/** Registration form. */
@Destroyable()
@Component({
  selector: 'camp-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  /** Is Loading. */
  public isLoading$ = new BehaviorSubject<boolean>(false);

  /** Registration form. */
  public registrationForm = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.email,
      Validators.required,
    ]),

    firstName: this.formBuilder.nonNullable.control('', [Validators.required]),

    lastName: this.formBuilder.nonNullable.control('', [Validators.required]),

    password: this.formBuilder.nonNullable.control('', [Validators.required]),
  });

  /** Register. */
  public handleRegistrationSubmit(): void {

    if (this.registrationForm.invalid) {

      return void 0;
    }

    const { email, firstName, lastName, password } =
    this.registrationForm.value;

    this.userService
      .register({
        email: email ?? '',
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        password: password ?? '',
      })
      .pipe(
        toggleExecutionState(this.isLoading$),
        catchValidationData(this.registrationForm),
        takeUntilDestroy(this),
      )
      .subscribe();
  }

  public constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}
}
