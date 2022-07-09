import { $, Dom } from '../../core/Dom';

import { PaginationParams } from './animeTable';

interface PaginationPanelState {

  /** Array of page number. */
  pages: number[];
}

interface PaginationPanelProps {

  /** Pagination Params. */
  paginationParams: PaginationParams;

  /** Updates the pagination settings in the parent component. */
  updatePagination(paginatinoParams: PaginationParams): void;
}

/**
 * The class creates a pagination panel.
 */
export class PaginationPanel {
  private state: PaginationPanelState = {
    pages: [],
  };

  private setState(newState: PaginationPanelState): void {
    this.state = newState;
  }

  private props: PaginationPanelProps;

  private $root?: Dom;

  private setPagination(page: number): void {
    const { count, limit } = this.props.paginationParams;

    this.props.updatePagination({
      count, limit, offset: (page - 1) * limit,
    });
  }

  private generatePages(): void {
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
  }

  private updatePaginationButtons(): void {
    this.$root?.clear();

    const activePage = Math.floor(this.props.paginationParams.offset / this.props.paginationParams.limit) + 1 ;
    this.state.pages.forEach(num => {
      const $button = $.create('button', `w-10 border hover:bg-slate-200 ${activePage === num ? 'bg-slate-300' : ''}`.trim())
        .setTextContent(String(num));

      // Лучше сделать слушателся на родителе и вызывать по дата атрибуту и подобному
      $button.$el.addEventListener('click', () => {
        this.setPagination(num);
      });

      this.$root?.append($button);
    });
  }

  public constructor(props: PaginationPanelProps) {
    this.props = props;
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
   * Updated pugination buttons.
   * @param props Pagination Params.
   */
  public update(props: PaginationParams): void {
    this.props.paginationParams = props;
    this.generatePages();
    this.updatePaginationButtons();
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {
    this.$root = $.create('div', 'flex justify-center m-1');
  }
}
