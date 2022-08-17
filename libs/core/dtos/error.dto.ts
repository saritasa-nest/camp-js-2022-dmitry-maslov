export interface ErrorDTO<T> {

  /** Error data. */
  readonly data: T;

  /** Error Description. */
  readonly details: string;
}
