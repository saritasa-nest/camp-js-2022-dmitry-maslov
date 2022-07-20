import {
  SortDirection, AnimeSortField,
} from '@js-camp/core/enums/anime/sort';

import { Anime } from '@js-camp/core/models/anime/anime';

import { animeApi } from '../../services/anime.service';
import { tableStyles } from '../../constants/styles/animeTable';

import { PaginationPanel } from '../paginationPanel';

import { AnimeTableHeader, SortParams } from './animeTableHeader';
import { TableElements } from './animeTableElements';

interface AnimeTableState {

  /** Pagination params. */
  paginationParams: PaginationResponseParams;

  /** Order. */
  order: SortParams;

  /** List anime array. */
  elements: readonly Anime[];
}

/** The class creates a sorted table with anime and pagination. */
export class AnimeTable {
  private selector: string;

  private state: AnimeTableState = {
    paginationParams: {
      limit: 10,
      offset: 0,
      count: 0,
    },
    order: {
      sortDirection: SortDirection.NotSorted,
      sortField: AnimeSortField.Id,
    },
    elements: [],
  };

  /** Updates the state and causes a page refresh.
   * @param state  New state.
   */
  private setState(state: AnimeTableState): void {
    this.state = state;
    this.fetchDataAndUpdateElements();
  }

  private root?: Element;

  private tableElements = new TableElements();

  private paginationPanel = new PaginationPanel({
    changePaginationMethod: this.updatePaginationState.bind(this),
    defaultPaginationParams: this.state.paginationParams,
  });

  private tableHeader = new AnimeTableHeader({
    changeParentOrderParams: this.updateOrderState.bind(this),
  });

  public constructor(selector: string) {
    this.selector = selector;
  }

  private async fetchDataAndUpdateElements(): Promise<void> {
    const response = await animeApi.getPaginatedAnime({
      limit: this.state.paginationParams.limit,
      offset: this.state.paginationParams.offset,
      ordering: this.state.order,
    });

    this.state = {
      elements: response.results,
      order: this.state.order,
      paginationParams: {
        ...this.state.paginationParams,
        count: response.count,
      },
    };

    this.updateTable({
      elements: this.state.elements,
      order: this.state.order,
      paginationParams: this.state.paginationParams,
    });
  }

  private updateOrderState(order: SortParams): void {
    this.setState({
      ...this.state,
      paginationParams: {
        ...this.state.paginationParams,
        offset: 0,
      },
      order,
    });
  }

  private updatePaginationState(paginationParams: PaginationRequestParams): void {
    this.setState({
      ...this.state,
      paginationParams: {
        ...this.state.paginationParams,
        limit: paginationParams.limit,
        offset: paginationParams.offset,
      },
    });
  }

  private updateTable({ elements, paginationParams }: AnimeTableUpdateParams): void {
    this.tableElements.updateTableElements(elements);
    this.paginationPanel.updatePaginationElements(paginationParams);
    this.tableHeader.updateHeaders();
  }

  private async didMount(): Promise<void> {
    await this.fetchDataAndUpdateElements();
  }

  /** Render component on the root element. */
  public render(): void {
    const root = document.querySelector(this.selector);

    if (root === null) {
      throw new Error('Selector not found');
    }

    this.root = root;
    const table = document.createElement('table');
    table.classList.add(...tableStyles.table);

    this.tableElements.initializeTableBody();
    this.paginationPanel.initializePagination();
    this.tableHeader.initializeTableHeader();

    table.append(
      this.tableHeader.getElement(),
      this.tableElements.getElement(),
    );

    this.root.append(
      this.paginationPanel.getElement(),
      table,
    );

    this.didMount();
  }
}

/** Pagination request params. */
export interface PaginationRequestParams {

  /** Limit. */
  readonly limit: number;

  /** Offset. */
  readonly offset: number;
}

/** Parameters for pagination. */
export interface PaginationResponseParams {

  /** Limiting the amount of data. */
  readonly limit: number;

  /** Offset. */
  readonly offset: number;

  /** Number of elements on the server. */
  readonly count: number;
}

/** Parameters for update. */
export interface AnimeTableUpdateParams {

  /** Parameters for pagination. */
  readonly paginationParams: PaginationResponseParams;

  /** Offset. */
  readonly order: SortParams;

  /** Elements. */
  readonly elements: readonly Anime[];
}
