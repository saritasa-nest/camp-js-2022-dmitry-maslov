import { Immerable, OmitImmerable } from './immerable';

/** User. */
export class User extends Immerable {
  /** Email. */
  public readonly email: string;

  /** First name. */
  public readonly firstName: string;

  /** Last name. */
  public readonly lastName: string;

  /** Avatar url. */
  public readonly avatar: string;

  public constructor(data: InitArgs) {
    super();
    this.avatar = data.avatar;
    this.email = data.email;
    this.firstName = data.email;
    this.lastName = data.lastName;
  }
}

type InitArgs = OmitImmerable<User>;
