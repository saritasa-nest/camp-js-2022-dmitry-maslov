import { ListAnime } from '@js-camp/core/models/listAnime';

import {
  AnimeOrders,
  AnimeNotOrder,
} from '@js-camp/core/enums/anime/ordering.enum';

import {
  animeApi,
  GetPaginatedListAnimeListRequest,
  GetPaginatedListAnimeListResponse,
} from '../../services/anime.service';

import { $createAnimeTableElement } from './animeTableElement';
import { PaginationPanel } from './animeTablePagination';
import { AnimeTableHeader } from './animeTableHeader';

/**
 * The class creates a sorted table with anime and pagination.
 */
export class AnimeTable {
  private selector: string;

  private $root?: HTMLElement;

  private $TableElements?: TableElements;

  private $TableHeader: AnimeTableHeader = new TableHeader({
    updateMethod: this.fetchDataAndUpdateElements(),
  });

  private $PaginationPanel?: PaginationPanel;

  public constructor(selector: string) {
    this.selector = selector;
  }

  public fetchDataAndUpdateElements(
    props: GetPaginatedListAnimeListRequest
  ): void {
    const { limit, offset, ordering } = props;

    const response = await animeApi.getPaginatedListAnimeList({
      limit: 10,
      offset: 10,
      ordering: AnimeNotOrder.NotOrder,
    });

    this.update();
  }
  /**
   * Updates the contents of the component.
   */
  public update(): void {
    this.$TableElements?.update(elements);
    this.$TableHeader?.update(order);
    this.$PaginationPanel?.update(paginationParams);
  }

  private async didMount(): Promise<void> {
    this.fetchDataAndUpdateElements();
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {
    this.$root = document.querySelector(this.selector);

    if (this.$root === undefined) {
      throw new Error('Selector not found');
    }

    this.$TableHeader = this.$PaginationPanel = new PaginationPanel({
      updateMethod: this.fetchDataAndUpdateElements(),
    });

    this.$TableHeader = new TableElements({
      updateMethod: this.fetchDataAndUpdateElements(),
    });

    this.$TableHeader.mount();

    this.$root.append(document.createElement('div'));
    this.$root.append(this.$TableHeader.getElements());
    this.$root.append(this.$PaginationPanel.getElement());

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
