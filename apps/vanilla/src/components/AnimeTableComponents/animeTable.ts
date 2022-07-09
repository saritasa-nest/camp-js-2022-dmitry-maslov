import { ListAnime } from '@js-camp/core/models/listAnime';

import { AnimeOrders, AnimeNotOrder } from '@js-camp/core/enums/anime/ordering.enum';

import { $, Dom } from '../../core/Dom';

import { animeApi } from '../../services/anime.service';

import { $createAnimeTableElement } from './animeTableElement';
import { PaginationPanel } from './animeTablePagination';
import { AnimeTableHeader } from './animeTableHeader';

interface AnimeTableState {

  /** Anime Table Item Data. */
  elements: ListAnime[];

  /** Parameters for working with pagination. */
  paginationParams: PaginationParams;

  /** Sort order. */
  order: AnimeOrders;
}

/**
 * The class creates a sorted table with anime and pagination.
 */
export class AnimeTable {
  private state: AnimeTableState = {
    elements: [],
    paginationParams: {
      count: 0,
      limit: 25,
      offset: 0,
    },
    order: AnimeNotOrder.NotOrder,
  };

  private selector: string;

  private $root?: Dom;

  private $tableElements?: Dom;

  private $TableHeader?: AnimeTableHeader;

  private $PaginationPanel?: PaginationPanel;

  private setState(newState: AnimeTableState): void {
    this.state = newState;
    this.update();
  }

  /**
   * Gets anime list data and pagination data from the server.
   */
  private async getData(): Promise<void> {
    const requestParams = {
      ...this.state.paginationParams,
      ordering: this.state.order,
    };

    const { count, limit, offset, results } =
      await animeApi.getPaginatedListAnimeList({
        limit: requestParams.limit,
        offset: requestParams.offset,
        ordering: requestParams.ordering,
      });

    this.setState({
      elements: results,
      paginationParams: {
        count,
        limit,
        offset,
      },
      order: requestParams.ordering,
    });
  }

  private updateDomTableElements(): void {
    const $elements = this.state.elements.map(listAnime => $createAnimeTableElement(listAnime));

    if (this.$tableElements) {
      this.$tableElements
        .clear()
        .append(...$elements);
    } else {
      throw new Error(`${this}, not mounted`);
    }
  }

  private updatePaginationElement(): void {
    const { count, limit, offset } = this.state.paginationParams;

    if (this.$PaginationPanel) {
      this.$PaginationPanel.update({
        count, limit, offset,
      });
    } else {
      throw new Error(`${this}, not mounted`);
    }
  }

  private updatePaginationState = async(paginationParams: PaginationParams): Promise<void> => {
    this.setState({
      ...this.state,
      paginationParams,
    });

    await this.getData();
  };

  private updateOrderState = async(order: AnimeOrders): Promise<void> => {
    this.setState({
      ...this.state,
      order,
    });

    await this.getData();
  };

  public constructor(selector: string) {
    this.selector = selector;
  }

  /**
   * Updates the contents of the component.
   */
  public update(): void {
    this.updateDomTableElements();
    this.updatePaginationElement();
  }

  private async didMount(): Promise<void> {
    await this.getData();
    this.update();
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {

    this.$root = $(this.selector);

    this.$TableHeader = new AnimeTableHeader({
      order: this.state.order,
      setOrder: this.updateOrderState,
    });

    this.$TableHeader.mount();

    this.$PaginationPanel = new PaginationPanel({
      paginationParams: {
        count: this.state.paginationParams.count,
        limit: this.state.paginationParams.limit,
        offset: this.state.paginationParams.offset,
      },
      updatePagination: this.updatePaginationState,
    });

    this.$PaginationPanel.mount();

    this.$tableElements = $.create('tbody');

    this.$root.append(
      this.$PaginationPanel.getElement(),
      $.create('table', 'w-10/12')
        .append(
          this.$TableHeader.getElements(),
          this.$tableElements,
        ),
    );

    this.didMount();
  }
}

/**
 * Parameters for pagination.
 */
export interface PaginationParams {

  /** Limiting the amount of data. */
  limit: number;

  /** Offset. */
  offset: number;

  /** Number of elements on the server. */
  count: number;
}
