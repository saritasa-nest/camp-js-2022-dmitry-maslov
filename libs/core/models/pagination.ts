import { PaginationParams } from './paginationParams';
import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class PaginatedData<T> extends Immerable {

  /** Total number of items on the server. */
  public readonly total: number;

  /** Pagination params. */
  public readonly paginationParams: PaginationParams;

  /** Results. */
  public readonly results: readonly T[];

  public constructor(data: InitArgs<T>) {
    super();
    this.paginationParams = data.paginationParams;
    this.results = data.results;
    this.total = data.total;
  }
}

type InitArgs<T> = OmitImmerable<PaginatedData<T>>;
