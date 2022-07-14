import {
  AnimeNotOrder, AnimeOrders,
} from '@js-camp/core/enums/anime/ordering';

import { Anime } from '@js-camp/core/models/anime';

import { animeApi } from '../../services/anime.service';

import { tableStyles } from '../../constants/styles/animeTable';

import { AnimeTableHeader } from './animeTableHeader';

import { TableElements } from './animeTableElements';

import { PaginationPanel } from './paginationPanel';
import { FilterPanel } from './filterPanel';

interface AnimeTableState {

  /** Pagination params. */
  paginationParams: PaginationResponseParams;

  /** Filter params. */
  filterParams: FiltersParams;

  /** Order. */
  order: AnimeOrders;

  /** List anima array. */
  elements: Anime[];
}

/**
 * The class creates a sorted table with anime and pagination.
 */
export class AnimeTable {
  private selector: string;

  private state: AnimeTableState = {
    paginationParams: {
      limit: 10,
      offset: 0,
      count: 0,
    },
    filterParams: {
      searchTerm: '',
    },
    order: AnimeNotOrder.NotOrder,
    elements: [],
  };

  private root?: Element;

  private tableElements: TableElements = new TableElements();

  private updateOrderState = (newOrder: AnimeOrders): void => {
    this.state.order = newOrder;

    this.fetchDataAndUpdateElements();
  };

  private updatePaginationState = (paginationParams: PaginationRequestParams): void => {
    this.state.paginationParams = {
      ...this.state.paginationParams,
      limit: paginationParams.limit,
      offset: paginationParams.offset,
    };

    this.fetchDataAndUpdateElements();
  };

  private updateFiltersState = (filtersParams: FiltersParams): void => {
    this.state.filterParams = filtersParams;
    this.fetchDataAndUpdateElements();
  };

  private paginationPanel: PaginationPanel = new PaginationPanel({
    updateMethod: this.updatePaginationState,
    defaultPaginationParams: this.state.paginationParams,
  });

  private filterPanel: FilterPanel = new FilterPanel({
    updateMethod: this.updateFiltersState,
    defaultFilterParams: this.state.filterParams,
  });

  private tableHeader: AnimeTableHeader = new AnimeTableHeader({
    updateMethod: this.updateOrderState,
  });

  public constructor(selector: string) {
    this.selector = selector;
  }

  private async fetchDataAndUpdateElements(): Promise<void> {
    const response = await animeApi.getPaginatedListAnimeList({
      limit: this.state.paginationParams.limit,
      offset: this.state.paginationParams.offset,
      ordering: this.state.order,
      search: this.state.filterParams.searchTerm,
    });

    this.state = {
      elements: response.results,
      order: this.state.order,
      paginationParams: {
        ...this.state.paginationParams,
        count: response.count,
      },
      filterParams: this.state.filterParams,
    };

    this.updateTable({
      elements: this.state.elements,
      order: this.state.order,
      paginationParams: this.state.paginationParams,
    });
  }

  private updateTable({ elements, paginationParams }: AnimeTableUpdateParams): void {
    this.tableElements.update(elements);
    this.paginationPanel.update(paginationParams);
    this.tableHeader.update();
  }

  private async didMount(): Promise<void> {
    await this.fetchDataAndUpdateElements();
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {
    const root = document.querySelector(this.selector);

    if (root === null) {
      throw new Error('Selector not found');
    }

    this.root = root;
    const table = document.createElement('table');
    table.classList.add(...tableStyles.tableClass);

    this.tableElements.mount();
    this.paginationPanel.mount();
    this.tableHeader.mount();

    table.append(
      this.tableHeader.getElement(),
      this.tableElements.getElement(),
    );

    this.filterPanel.createHtml();
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

/** Filters request params. */
export interface FiltersParams {

  /** Search term. */
  searchTerm: string;
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
