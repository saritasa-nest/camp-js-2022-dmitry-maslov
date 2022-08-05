/** User registration data. */
export interface Registration {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly firstName: string;

  /** Avatar. */
  readonly avatar?: string;

  /** Last name. */
  readonly lastName: string;

  /** Password. */
  readonly password: string;
}
