import { SortParams } from '@js-camp/angular/core/models/sortParams';
import { BehaviorSubject, Observable } from 'rxjs';

/** Sort manager. */
export class SortManager<T> {
  private sortParams$ = new BehaviorSubject<SortParams<T>>({
    direction: '',
    sortBy: '',
  });

  /**
   * Set sort params.
   * @param sortParams Sort params.
   */
  public setSortParams(sortParams: SortParams<T>): void {
    this.sortParams$.next(sortParams);
  }

  /** Returned sort params observer. */
  public getSortParamsObserver(): Observable<SortParams<T>> {
    return this.sortParams$;
  }
}
