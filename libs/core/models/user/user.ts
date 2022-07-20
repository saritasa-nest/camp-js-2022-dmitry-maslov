import { Immerable, OmitImmerable } from '../immerable';

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
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.avatar = data.avatar;
  }
}

type InitArgs = OmitImmerable<User>;
