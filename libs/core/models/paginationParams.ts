import { Immerable, OmitImmerable } from './immerable';

/** Pagination params. */
export class PaginationParams extends Immerable {
  /** Actual page. */
  public readonly page: number;

  /** Limit elements to display on a page. */
  public readonly limit: number;

  public constructor(data: InitArgs) {
    super();
    this.page = data.page;
    this.limit = data.limit;
  }
}

type InitArgs = OmitImmerable<PaginationParams>;
