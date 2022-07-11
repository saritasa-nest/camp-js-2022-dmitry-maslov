import { PaginationRequestParams, PaginationResponseParams } from './animeTable';

type UpdateMethod = (paginationParams: PaginationRequestParams) => void;

/**
 * The class creates a pagination panel.
 */
export class PaginationPanel {
  private $root?: Element;

  private buttonsCountLimit = 10;

  private $buttons: Element[] = [];

  private updateMethod: UpdateMethod;

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
    }
  }

  public constructor(setNewPaginationAndUpdateCallback: UpdateMethod) {
    this.updateMethod = setNewPaginationAndUpdateCallback;
  }

  /**
   * Returns an instance HTML Element.
   * @returns Element. Html Component element.
   */
  public getElement(): Element {
    if (this.$root === null) {
      throw new Error(`${this} component not mount`);
    }
    return this.$root;
  }

  private createButton(numOfPage: number): Element {
    const $button = document.createElement('button');

    $button.classList.add('w-12', 'border');
    $button.dataset.page = String(numOfPage);
    $button.setAttribute('data-page', String(numOfPage));
    $button.textContent = String(numOfPage);

    return $button;
  }

  /**
   * Updated pugination buttons.
   * @param paginationParams Pagination Params.
   */
  public update(paginationParams: PaginationResponseParams): void {
    const { limit, offset, count} = paginationParams;

    if (this.$buttons[0] === undefined) {
      this.$buttons[0] = this.createButton(1);
    }

    this.$root?.append(this.$buttons[0]);

    const maxPage = count / limit + (count % limit ? 1 : 0);
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {
    this.$root = document.createElement('div');
    this.$root.classList.add('flex', 'justify-center', 'm-1');

    this.$root.addEventListener('click', (event) => {
      console.log(event.target.dataset.page)
    });
  }
}
