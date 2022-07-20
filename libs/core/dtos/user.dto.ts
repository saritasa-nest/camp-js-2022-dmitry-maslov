/** User DTO. */
export interface UserDto {

  /** Email. */
  readonly email: string;

  /** First name. */
  readonly first_name: string;

  /** Last name. */
  readonly last_name: string;

  /** Avatar url. */
  readonly avatar: string;

  /** Creation time, for example, "2014-12-20T17:30:50.416Z". */
  readonly created: string;

  /** Time of the last modification, for example, "2014-12-20T17:30:50.416Z". */
  readonly modified: string;

  /** DTO type. */
  readonly type: 'USER';
}
