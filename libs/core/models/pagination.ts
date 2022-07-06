import { Immerable, OmitImmerable } from './immerable';

/** Pagination. */
export class Pagination<T> extends Immerable {

  /** Count. */
  public readonly count: number;

  /** Name. */
  public readonly results: T[];

  public constructor(data: PostInitArgs<T>) {
    super();
    this.count = data.count;
    this.results = data.results;
  }
}

type PostInitArgs<T> = OmitImmerable<Pagination<T>>;
