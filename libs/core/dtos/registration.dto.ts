export interface RegistrationValidationErrorsDto {

  /** Email. */
  readonly email?: readonly string[];

  /** First name. */
  readonly first_name?: readonly string[];

  /** Last name. */
  readonly last_name?: readonly string[];

  /** Avatar.  */
  readonly avatar?: readonly string[];

  /** Password. */
  readonly password?: readonly string[];

}

/** User registration DTO. */
export interface RegistrationDataDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name?: string;

  /** Last name. */
  readonly last_name?: string;

  /** Avatar.  */
  readonly avatar?: string;

  /** Password. */
  readonly password: string;

}
