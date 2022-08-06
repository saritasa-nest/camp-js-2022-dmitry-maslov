import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

/**
 * Allows to listen the touched state change.
 * The util is needed until Angular allows to listen for such events.
 * Https://github.com/angular/angular/issues/10887.
 * @param control Control to listen for.
 */
export function listenControlTouched<T extends AbstractControl>(
  control: T,
): Observable<boolean> {
  return new Observable<boolean>(observer => {
    const originalMarkAsTouched = control.markAsTouched;
    const originalReset = control.reset;

    control.reset = (...args) => {
      observer.next(false);
      originalReset.call(control, ...args);
    };

    control.markAsTouched = (...args) => {
      observer.next(true);
      originalMarkAsTouched.call(control, ...args);
    };

    if (control.touched) {
      observer.next(true);
    }

    return () => {
      control.markAsTouched = originalMarkAsTouched;
      control.reset = originalReset;
    };
  });
}
