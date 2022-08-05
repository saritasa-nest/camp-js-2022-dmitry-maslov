import { UntypedFormGroup } from '@angular/forms';
import { AppError, AppValidationError, EntityValidationErrors } from '@js-camp/core/models/app-error';
import {
  MonoTypeOperatorFunction,
  ObservableInput, OperatorFunction,
  Subject, throwError,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppValidators } from '../validators';

/**
 * Util operator function to catch `AppValidationError` on presentational logic.
 * @param subjectOrForm$ Subject to emit data if it was there.
 */
export function catchValidationData<T, R>(
  subjectOrForm$: Subject<EntityValidationErrors<T>> | UntypedFormGroup,
): OperatorFunction<R, R | never> {
  return source$ =>
    source$.pipe(
      catchError((error: unknown) => {
        // In case error is what we want, pass it to provided subject and finish the stream
        if (error instanceof AppValidationError) {
          const { validationData } = error;
          if (subjectOrForm$ instanceof Subject) {
            subjectOrForm$.next(validationData);
          } else {
            fillFormWithError(subjectOrForm$, validationData);
          }
          return throwError(() => new AppError('Invalid form data.'));
        }

        // Otherwise, let the error go
        return throwError(() => error);
      }),
    );
}

/**
 * Fill the form with error data.
 * @param form Form to fill.
 * @param errors Array of errors.
 */
function fillFormWithError<T>(
  form: UntypedFormGroup,
  errors: EntityValidationErrors<T>,
): void {
  const controlKeys = Object.keys(form.controls) as (keyof T)[];
  controlKeys.forEach(key => {
    const error = errors[key];
    const control = form.controls[key as string];
    if (error && control) {
      // If error is not nested
      if (typeof error === 'string') {
        control.setErrors(AppValidators.buildAppError(error));
      } else if (control instanceof UntypedFormGroup && typeof error === 'object') {
        // Since we checked the error type, help typescript with error typing
        fillFormWithError(control, error as EntityValidationErrors<T[keyof T]>);
      }
    }
  });
}

/**
 * Catch application validation error (instance of AppValidationError) operator.
 * Catches only AppValidationError<T> errors.
 * @param selector Selector.
 */
export function catchValidationError<
  T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  O extends ObservableInput<any>,
  TEntity extends object = T extends object ? T : object,
>(
  selector: (error: AppValidationError<TEntity>) => O,
): MonoTypeOperatorFunction<T> {
  return catchError((error: unknown) => {
    if (error instanceof AppValidationError) {
      return selector(error);
    }
    return throwError(() => error);
  });
}
