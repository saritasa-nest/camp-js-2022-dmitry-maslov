import { PaginationParams } from './../interfaces/paginationParams';
import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class PaginatedData<T> extends Immerable {

  /** Total number of items on the server. */
  public readonly total: number;

  /** Pagination params. */
  public readonly paginationParams: PaginationParams;

  /** Results. */
  public readonly items: readonly T[];

  public constructor(data: InitArgs<T>) {
    super();
    this.paginationParams = data.paginationParams;
    this.items = data.items;
    this.total = data.total;
  }
}

type InitArgs<T> = OmitImmerable<PaginatedData<T>>;
