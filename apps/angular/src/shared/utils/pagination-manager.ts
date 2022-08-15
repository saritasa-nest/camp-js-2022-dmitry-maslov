import { PaginationParams } from '@js-camp/core/models/pagination-params';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';

const DEFAULT_PAGINATION_PARAMS = {
  limit: 10,
  page: 1,
};

const RESET_PAGINATION_PAGE = 1;

/** Pagination Manager. */
export class PaginationManager {
  private limit$ = new BehaviorSubject(DEFAULT_PAGINATION_PARAMS.limit);

  private page$ = new BehaviorSubject(DEFAULT_PAGINATION_PARAMS.page);

  /**
   * Set page.
   * @param page New page.
   */
  public setPage(page: number): void {
    this.page$.next(page);
  }

  /**
   * Set limit.
   * @param limit New limit.
   */
  public setLimit(limit: number): void {
    this.page$.next(limit);
  }

  /** Returned pagination params observable. */
  public getPaginationParams(): Observable<PaginationParams> {
    return combineLatest([this.limit$, this.page$]).pipe(
      switchMap(([limit, page]) => of({ limit, page })),
    );
  }

  /**
   * Set pagination params.
   * @param PaginationParams {@link PaginationParams}.
   */
  public setPaginationParams({ limit, page }: PaginationParams): void {
    this.limit$.next(limit);
    this.page$.next(page);
  }

  /** Reset pagination page. */
  public resetPaginationPage(): void {
    this.page$.next(RESET_PAGINATION_PAGE);
  }
}
