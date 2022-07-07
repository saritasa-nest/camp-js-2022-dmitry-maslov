import { $, Dom } from '../../core/Dom';

import { GetPaginatedListAnimeListResponse } from './../../services/anime.service';

import { Pagination } from './../../../../../libs/core/models/pagination';
import { PaginationParams } from './animeTable';

interface PaginationPanelState {
  pages: number[];
}

interface PaginationPanelProps {
  paginationParams: PaginationParams;
  updatePagination: (paginatinoParams: PaginationParams) => void;
}

interface PaginationPanelMethods {
  setPagination(page: number): void;
  generatePages(): void;
  updatePaginationButtons(): void;
}

export class PaginationPanel {
  private state: PaginationPanelState = {
    pages: [],
  };

  private setState(newState: PaginationPanelState): void {
    this.state = newState;
  }

  private props: PaginationPanelProps;

  private $root?: Dom;

  private methods: PaginationPanelMethods;

  public constructor(props: PaginationPanelProps) {
    this.props = props;

    this.methods = {
      setPagination: (page: number) => {
        const { count, limit } = this.props.paginationParams;

        this.props.updatePagination({
          count, limit, offset: (page - 1) * limit,
        });
      },
      generatePages: () => {
        const { count, limit, offset } = this.props.paginationParams;

        if (count > limit) {
          const otherPages: number[] = [];
          const lastPage = Math.floor(count / limit);
          const activePage = Math.floor(offset / limit) + 1;

          const otherButtonsLength = 8;

          let firstPage = activePage - Math.floor(otherButtonsLength / 2);
          let penultPage = activePage + Math.floor(otherButtonsLength / 2);

          if (firstPage - 1 <= 1) {
            firstPage = 2;
            penultPage = otherButtonsLength + firstPage - 1;
          } else if (penultPage + 1 >= lastPage) {
            penultPage = lastPage - 1;
            firstPage = penultPage - otherButtonsLength + 1;
          }

          for (let i = firstPage; i <= penultPage; i++) {
            otherPages.push(i);
          }

          this.setState({
            pages: [
              1,
              ...otherPages,
              lastPage,
            ],
          });
        }
      },
      updatePaginationButtons: () => {
        this.$root?.clear();

        const activePage = Math.floor(this.props.paginationParams.offset / this.props.paginationParams.limit) + 1 ;
        this.state.pages.forEach(num => {
          const $button = $.create('button', `w-10 border hover:bg-slate-200 ${activePage === num ? 'bg-slate-300' : ''}`.trim())
            .setTextContent(String(num));
          $button.$el.addEventListener('click', () => this.methods.setPagination(num));

          this.$root?.append($button);
        });
      },
    };
    this.methods.generatePages();
  }

  /**
   * Returns an instance of the DOM element if mounted, otherwise throws an error.
   * @returns DOM.
   */
  public getElement(): Dom {
    if (this.$root) {
      return this.$root;
    }
    throw new Error(`${this} component not mount`);

  }

  /**
   *
   * @param props
   */
  public update(props: PaginationParams): void {
    this.props.paginationParams = props;
    this.methods.generatePages();
    this.methods.updatePaginationButtons();
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {
    this.$root = $.create('div', 'flex justify-center m-1');
  }
}
