import { Immerable, OmitImmerable } from './immerable';

/** JWT. */
export class JWT extends Immerable {

  /** Refresh token. */
  public readonly refresh: string;

  /** Access token. */
  public readonly access: string;

  public constructor(data: InitArgs) {
    super();
    this.refresh = data.refresh;
    this.access = data.access;
  }
}

type InitArgs = OmitImmerable<JWT>;
