/** Refresh token DTO. */
export interface RefreshTokenDto {

  /** Refresh token. */
  readonly refresh: string;

  /** DTO type. */
  readonly type: 'REFRESH_TOKEN';
}
