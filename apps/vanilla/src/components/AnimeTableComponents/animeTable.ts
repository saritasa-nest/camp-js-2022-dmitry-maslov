import { ListAnime } from '@js-camp/core/models/listAnime';

import { AnimeOrder, AnimeOrders, AnimeNotOrder } from '@js-camp/core/enums/anime/ordering.enum';

import { $, Dom } from '../../core/Dom';

import { animeApi } from '../../services/anime.service';

// Components
import { $createAnimeTableElement } from './animeTableElement';
import { PaginationPanel } from './animeTablePagination';
import { AnimeTableHeaderComponent } from './SotredPanel';

interface AnimeTableState {

  /** Anime Table Item Data. */
  elements: ListAnime[];

  /** Parameters for working with pagination. */
  paginationParams: PaginationParams;

  order: AnimeOrders;
}

interface AnimeTableMethods {

  /** Gets anime list data and pagination data from the server. */
  getData(): Promise<void>;

  /** Updates elements in an html table. */
  updateDomTableElements(): void;

  updatePaginationElement(): void;

  updatePaginationState(paginationParams: PaginationParams): Promise<void>;

  updateOrderState(order: AnimeOrder): Promise<void>;
}

export class AnimeTableComponent {
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

  private $TableHeader?: AnimeTableHeaderComponent;

  private $PaginationPanel?: PaginationPanel;

  private setState(newState: AnimeTableState): void {
    this.state = newState;
    this.update();
  }

  /**
   * TODO: Translate to english.
   * Методы компонента, которые не являются главными методам компонента.
   */
  private methods: AnimeTableMethods;

  public constructor(selector: string) {
    this.selector = selector;

    this.methods = {
      getData: async() => {
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
      },

      updateDomTableElements: () => {
        const $elements = this.state.elements.map(listAnime => $createAnimeTableElement(listAnime));

        if (this.$tableElements) {
          this.$tableElements
            .clear()
            .append(...$elements);
        } else {
          throw new Error(`${this}, not mounted`);
        }
      },

      updatePaginationElement: () => {
        const { count, limit, offset } = this.state.paginationParams;

        if (this.$PaginationPanel) {
          this.$PaginationPanel.update({
            count, limit, offset,
          });
        } else {
          throw new Error(`${this}, not mounted`);
        }
      },

      updatePaginationState: async paginationParams => {
        this.setState({
          ...this.state,
          paginationParams,
        });

        await this.methods.getData();
      },
      updateOrderState: async order => {
        this.setState({
          ...this.state,
          order,
        });

        await this.methods.getData();
      },
    };
  }

  /**
   * Updates the contents of the component.
   */
  public update(): void {
    this.methods.updateDomTableElements();
    this.methods.updatePaginationElement();
  }

  private async didMount(): Promise<void> {
    await this.methods.getData();
    this.update();
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {

    this.$root = $(this.selector);

    this.$TableHeader = new AnimeTableHeaderComponent({
      order: this.state.order,
      setOrder: this.methods.updateOrderState,
    });

    this.$TableHeader.mount();

    this.$PaginationPanel = new PaginationPanel({
      paginationParams: {
        count: this.state.paginationParams.count,
        limit: this.state.paginationParams.limit,
        offset: this.state.paginationParams.offset,
      },
      updatePagination: this.methods.updatePaginationState,
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

export interface PaginationParams {

  /** Limiting the amount of data. */
  limit: number;

  /** Offset. */
  offset: number;

  /** Number of elements on the server. */
  count: number;
}
