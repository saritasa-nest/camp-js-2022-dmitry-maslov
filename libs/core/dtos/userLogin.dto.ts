/** User login DTO. */
export interface UserLoginDto {

  /** Email. */
  readonly email: string;

  /** Password. */
  readonly password: string;

  /** DTO type. */
  readonly type: 'USER_LOGIN';
}
