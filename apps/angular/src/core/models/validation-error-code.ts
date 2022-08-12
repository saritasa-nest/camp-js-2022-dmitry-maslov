/** Validation error code. */
export enum ValidationErrorCode {

  /** Wrong email.*/
  Email = 'email',

  /** Required field. */
  Required = 'required',

  /** Match of values error. When value of one control does not match to another. */
  Match = 'match',

  /** Minimal length restriction. */
  MinLength = 'minlength',

  /** Maximal length restriction. */
  MaxLength = 'maxlength',

  /** Maximum value restriction. */
  Min = 'min',

  /** Minimum value restriction. */
  Max = 'max',

  /** Pattern restriction. */
  Pattern = 'pattern',

  /** Custom error. */
  AppError = 'appError',

  /** Value is greater than the compared one. */
  Greater = 'greater',
}

/** Match validation error data. */
export interface MatchErrorData {

  /** Control name. */
  readonly controlName: string;

  /** Control title. */
  readonly controlTitle: string;
}

/** Length validation error data. */
export interface LengthErrorData {

  /** Actual length. */
  readonly actualLength: number;

  /** Required length. */
  readonly requiredLength: number;
}

/** Pattern validation error data. */
export interface PatternErrorData {

  /** Actual length. */
  readonly actualValue: string;

  /** Required length. */
  readonly requiredPattern: string;
}

/** App validation error data. */
export interface AppErrorData {

  /** Message. */
  readonly message: string;
}

/** Min value validation error data. */
export interface MinValueErrorData {

  /** Actual value. */
  readonly actual: number;

  /** Min value. */
  readonly min: number;
}

/** Max value validation error data.*/
export interface MaxValueErrorData {

  /** Actual value. */
  readonly actual: number;

  /**  Min value. */
  readonly max: number;
}
