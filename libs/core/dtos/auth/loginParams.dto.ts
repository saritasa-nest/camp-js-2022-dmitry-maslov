/** User login DTO. */
export interface LoginParamsDto {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;

  /** DTO type. */
  readonly type: 'LOGIN';
}
