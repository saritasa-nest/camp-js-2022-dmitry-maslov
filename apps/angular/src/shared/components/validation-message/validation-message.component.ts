/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import {
  ValidationErrorCode,
  MatchErrorData,
  LengthErrorData,
  AppErrorData,
  MinValueErrorData,
  MaxValueErrorData,
} from '../../../core/models/validation-error-code';

/** Validation error messages. */
const validationErrorMessageFactories = {
  [ValidationErrorCode.Email]: () => 'Email is not valid',
  [ValidationErrorCode.Required]: () => 'This field is required',
  [ValidationErrorCode.Match]: ({ controlTitle }: MatchErrorData) => `Value does not match with "${controlTitle}"`,
  [ValidationErrorCode.MinLength]: ({ requiredLength }: LengthErrorData) => `Minimal length is ${requiredLength}`,
  [ValidationErrorCode.MaxLength]: ({ requiredLength }: LengthErrorData) => `Maximum length is ${requiredLength} characters`,
  [ValidationErrorCode.Pattern]: () => 'Value does not satisfy the pattern',
  [ValidationErrorCode.AppError]: ({ message }: AppErrorData) => message,
  [ValidationErrorCode.Min]: ({ min }: MinValueErrorData) => `Minimum value is ${min}`,
  [ValidationErrorCode.Max]: ({ max }: MaxValueErrorData) => `Maximum value is ${max}`,
  [ValidationErrorCode.Greater]: ({ controlTitle }: any) => `The value should be greater than ${controlTitle}`,
};

/**
 * Validation error renderer component.
 * Renders first error from control errors.
 */
@Component({
  selector: 'camp-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {
  /**
   * Validation errors.
   */
  @Input()
  public errors: ValidationErrors | null = null;

  /**
   * Error message as a string.
   */
  public get errorMessage(): string | null {
    if (this.errors == null) {
      return null;
    }
    const errorCode = Object.keys(this.errors)[0] as ValidationErrorCode;
    return this.getErrorMessage(errorCode, this.errors[errorCode]);
  }

  /**
   * Get error message for specific validation error.
   * @param errorCode Error code (minlength, required and etc.).
   * @param errorData Data of error. See details of HTTP validation errors or implementation of custom.
   * For instance data of minlength error is: { actualLength, requiredLength }.
   */
  private getErrorMessage(
    errorCode: ValidationErrorCode,
    errorData: any,
  ): string {
    const factory = validationErrorMessageFactories[errorCode];
    if (factory == null) {
      console.warn(
        `Can not find validation message factory for error: ${errorCode}`,
      );
      return 'Value is not valid';
    }
    return factory(errorData);
  }
}
