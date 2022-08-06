/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Optional,
  Host,
  SkipSelf,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { ControlContainer, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

/**
 * Form control validation message component.
 * Render error message for the target form control.
 */
@Component({
  selector: 'saanboc-form-control-validation-message',
  templateUrl: './form-control-validation-message.component.html',
  styleUrls: ['./form-control-validation-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlValidationMessageComponent
implements OnChanges, DoCheck {
  /**
   * Target form control name.
   */
  @Input()
  public controlName?: string;

  /**
   * Target form control.
   */
  @Input()
  public control?: AbstractControl;

  /**
   * Form control.
   */
  public readonly formControl$ = new BehaviorSubject<
    AbstractControl | undefined
  >(void 0);

  public constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (this.control != null && this.controlName != null) {
      throw new Error(
        'You can not specify the both: `control` and `controlName`. Use only one of them.',
      );
    }
    let formControl = this.control;
    if ('controlName' in changes && this.controlName != null) {
      const control = this.parent?.control?.get(this.controlName.toString());
      if (control == null) {
        throw new Error('Cannot find an abstract control with specified name');
      }
      formControl = control;
    }
    this.formControl$.next(formControl);
  }

  /**
   * @inheritdoc
   */
  public ngDoCheck(): void {
    // Re-get form control on do check, because parent FormControl could be re-created.
    let formControl = this.control;
    if (this.controlName != null) {
      formControl = this.parent?.control?.get(this.controlName.toString()) as
        | AbstractControl
        | undefined;
    }
    this.formControl$.next(formControl);
  }

  /**
   * Should error message be displayed.
   * @param control Control to check.
   */
  public shouldDisplayErrorMessage(control: AbstractControl): boolean {
    // Display if a user changed value or value already presented (pre-initialized).
    const hasValue = control.value != null && control.value !== '';

    return (
      control.touched || control.dirty || (hasValue && control.errors != null)
    );
  }
}
