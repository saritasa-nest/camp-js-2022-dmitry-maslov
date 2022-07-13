/** JWT meta info. */
export interface JWTDto {

  /** Refresh token. */
  readonly refresh: string;

  /** Access token. */
  readonly access: string;
}
