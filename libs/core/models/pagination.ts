import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {

  /** Count. */
  public readonly count: number;

  /** Results. */
  public readonly results: readonly T[];

  public constructor(data: InitArgs<T>) {
    super();
    this.count = data.count;
    this.results = data.results;
  }
}

type InitArgs<T> = OmitImmerable<Pagination<T>>;
