import { ListAnime } from '@js-camp/core/models/listAnime';

import { $, Dom } from '../../core/Dom';

import { animeApi } from '../../services/anime.service';

// Components
import { $createAnimeTableElement } from './animeTableElement';
import { PaginationPanel } from './animeTablePagination';

interface AnimeTableState {

  /** Anime Table Item Data. */
  elements: ListAnime[];

  /** Parameters for working with pagination. */
  paginationParams: PaginationParams;
}

interface AnimeTableMethods {

  /** Gets anime list data and pagination data from the server. */
  getData(): Promise<void>;

  /** Updates elements in an html table. */
  updateDomTableElements(): void;

  updatePaginationElement(): void;

  updatePaginationState(paginationParams: PaginationParams): Promise<void>;
}

export class AnimeTableComponent {
  private state: AnimeTableState = {
    elements: [],
    paginationParams: {
      count: 0,
      limit: 25,
      offset: 0,
    },
  };

  private selector: string;

  private $root?: Dom;

  private $tbody?: Dom;

  private $PaginationPanel?: PaginationPanel;

  private prevState: AnimeTableState = this.state;

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
        const requestParams = this.state.paginationParams;

        const { count, limit, offset, ordering, results } =
          await animeApi.getPaginatedListAnimeList({
            limit: requestParams.limit,
            offset: requestParams.offset,
            ordering: 'id',
          });

        this.setState({
          elements: results,
          paginationParams: {
            count,
            limit,
            offset,
          },
        });
      },

      updateDomTableElements: () => {
        const $elements = this.state.elements.map(listAnime => $createAnimeTableElement(listAnime));

        if (this.$tbody) {
          this.$tbody
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
        this.update();
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
    this.$tbody = $.create('tbody');
    this.$PaginationPanel = new PaginationPanel({
      paginationParams: {
        count: this.state.paginationParams.count,
        limit: this.state.paginationParams.limit,
        offset: this.state.paginationParams.offset,
      },
      updatePagination: this.methods.updatePaginationState,
    });

    this.$PaginationPanel.mount();

    this.$root.append(
      $.create('table', 'w-10/12')
        .append(
          this.$PaginationPanel.getElement(),
          this.$tbody,
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
