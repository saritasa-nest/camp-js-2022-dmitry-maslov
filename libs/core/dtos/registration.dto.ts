/** User registration DTO. */
export interface RegistrationDataDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Password. */
  readonly password: string;

  /** DTO type. */
  readonly type: 'REGISTRATION_PARAMS';
}
