import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Destroyable, takeUntilDestroy } from '@js-camp/angular/core/utils/rxjs/destroyable';
import { AppValidators } from '@js-camp/angular/core/utils/validators';

import { listenControlTouched } from '@saanbo/common/core/utils/rxjs/listen-control-touched';
import { EMPTY, merge, Observable, ReplaySubject, tap } from 'rxjs';
import { distinct, mapTo, switchMap } from 'rxjs/operators';

/**
 * Label component. Displays error and label for the input component.
 */
@Destroyable()
@Component({
  selector: 'camp-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements OnInit {
  /**
   * Error text.
   */
  @Input()
  public set errorText(text: string | null) {
    if (text != null) {
      this.errors$.next(AppValidators.buildAppError(text));
    }
  }

  /**
   * Text of control's label.
   */
  @Input()
  public labelText: string | null = null;

  /** Catch inner input by form control directive. */
  @ContentChild(NgControl)
  public set input(i: NgControl) {
    if (i) {
      this.input$.next(i);
    }
  }

  /** Errors stream. */
  public readonly errors$ = new ReplaySubject<ValidationErrors | null>(1);

  private readonly input$ = new ReplaySubject<NgControl>(1);

  /** @inheritDoc */
  public ngOnInit(): void {
    this.initErrorStreamSideEffect().pipe(takeUntilDestroy(this))
      .subscribe();
  }

  private initErrorStreamSideEffect(): Observable<ValidationErrors | null> {
    return this.input$.pipe(
      distinct(),
      switchMap(input =>
        merge(
          input.statusChanges ?? EMPTY,
          input.control ? listenControlTouched(input.control) : EMPTY,
        ).pipe(mapTo(input))),
      tap(input => this.errors$.next(input.errors)),
    );
  }
}
