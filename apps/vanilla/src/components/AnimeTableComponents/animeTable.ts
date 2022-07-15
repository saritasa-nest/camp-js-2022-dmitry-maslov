import {
  AnimeNotOrder,
} from '@js-camp/core/enums/anime/ordering';

import { AnimeOrders } from '@js-camp/core/types/anime/ordering';

import { Anime } from '@js-camp/core/models/anime';

import { AnimeFilter } from '@js-camp/core/types/anime/filters';

import { AnimeFilters } from '@js-camp/core/interfaces/filter';

import { animeApi } from '../../services/anime.service';

import { tableStyles } from '../../constants/styles/animeTable';

import { PaginationPanel } from '../paginationPanel';

import { FilterPanel } from './../filterPanel';

import { AnimeTableHeader } from './animeTableHeader';

import { TableElements } from './animeTableElements';

interface AnimeTableState {

  /** Pagination params. */
  paginationParams: PaginationResponseParams;

  /** Order. */
  order: AnimeOrders;

  /** List anima array. */
  elements: Anime[];

  /** Filters. */
  filters: AnimeFilters;
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
    order: AnimeNotOrder.NotOrder,
    elements: [],
    filters: {
      type: [],
    },
  };

  private root?: Element;

  private tableElements: TableElements = new TableElements();

  private paginationPanel: PaginationPanel = new PaginationPanel({
    updateMethod: this.updatePaginationState.bind(this),
    defaultPaginationParams: this.state.paginationParams,
  });

  private tableHeader: AnimeTableHeader = new AnimeTableHeader({
    updateMethod: this.updateOrderState.bind(this),
  });

  private filterPanel: FilterPanel = new FilterPanel({
    filters: this.state.filters,
    updateMethod: this.updateFilterState.bind(this),
  });

  public constructor(selector: string) {
    this.selector = selector;
  }

  private async fetchDataAndUpdateElements(): Promise<void> {
    const response = await animeApi.getPaginatedAnime({
      limit: this.state.paginationParams.limit,
      offset: this.state.paginationParams.offset,
      ordering: this.state.order,
      filters: this.state.filters,
    });

    this.state = {
      ...this.state,
      elements: response.results,
      paginationParams: {
        ...this.state.paginationParams,
        count: response.count,
      },
    };

    this.updateTable({
      ...this.state,
    });
  }

  private setState(newState: AnimeTableState): void {
    this.state = newState;

    this.fetchDataAndUpdateElements();
  }

  private updateFilterState(filters: AnimeFilter []): void {
    this.setState({
      ...this.state,
      paginationParams: {
        ...this.state.paginationParams,
        offset: 0,
      },
      filters,
    });

    console.log(this.state);
  }

  private updateOrderState(order: AnimeOrders): void {
    this.setState({
      ...this.state,
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
    this.paginationPanel.updatePagination(paginationParams);
    this.tableHeader.updateHeaders();
    this.filterPanel.updateFilterPanel();
  }

  private async didMount(): Promise<void> {
    await this.fetchDataAndUpdateElements();
  }

  /** Mount the component on the root element. */
  public mount(): void {
    const root = document.querySelector(this.selector);

    if (root === null) {
      throw new Error('Selector not found');
    }

    this.root = root;
    const table = document.createElement('table');
    table.classList.add(...tableStyles.tableClass);

    this.tableElements.initializeTableBody();
    this.paginationPanel.initializePagination();
    this.tableHeader.initializeTableHeader();
    this.filterPanel.initializeFilterPanel();

    table.append(
      this.tableHeader.getElement(),
      this.tableElements.getElement(),
    );

    this.root.append(
      this.filterPanel.getElement(),
      this.paginationPanel.getElement(),
      table,
    );

    this.didMount();
  }
}

/** Pagination request params. */
export interface PaginationRequestParams {

  /** Limit. */
  limit: number;

  /** Offset. */
  offset: number;
}

/** Parameters for pagination. */
export interface PaginationResponseParams {

  /** Limiting the amount of data. */
  limit: number;

  /** Offset. */
  offset: number;

  /** Number of elements on the server. */
  count: number;
}

/** Parameters for update. */
export interface AnimeTableUpdateParams {

  /** Parameters for pagination. */
  paginationParams: PaginationResponseParams;

  /** Offset. */
  order: AnimeOrders;

  /** Elements. */
  elements: Anime[];
}
