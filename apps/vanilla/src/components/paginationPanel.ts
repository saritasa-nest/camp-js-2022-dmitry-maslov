import { paginationStyles } from '../constants/styles/pagination';

import { nextButtonContent, prevButtonContent } from '../constants/pagination/buttons';

import { PaginationRequestParams, PaginationResponseParams } from './AnimeTableComponents/animeTable';

type ChangePaginationMethod = (paginationParams: PaginationRequestParams) => void;

interface PaginationPanelProps {

  /** Method to update pagination data in parent component. */
  readonly changePaginationMethod: ChangePaginationMethod;

  /** Default pagination parameters. */
  readonly defaultPaginationParams: PaginationResponseParams;
}

const buttonActiveClasses = ['bg-slate-300'];

/** The class creates a pagination panel. */
export class PaginationPanel {
  private root?: Element;

  private paginationParams: PaginationResponseParams;

  private buttons?: {
    next: HTMLButtonElement;
    prev: HTMLButtonElement;
    otherButtonsContainer: HTMLElement;
  };

  private changeMethod: ChangePaginationMethod;

  public constructor(props: PaginationPanelProps) {
    this.changeMethod = props.changePaginationMethod;
    this.paginationParams = props.defaultPaginationParams;
  }

  /** Returns an instance HTML Element.*/
  public getElement(): Element {
    if (this.root === undefined) {
      throw new Error(`${this} component not mount`);
    }
    return this.root;
  }

  private createButton(text: string): HTMLButtonElement {
    const button = document.createElement('button');

    button.classList.add(...paginationStyles.button);
    button.textContent = text;
    button.type = 'button';

    return button;
  }

  private generateOtherButtons(): HTMLElement[] {
    const { limit, offset, count } = this.paginationParams;

    const otherButtons: HTMLElement[] = [];

    const actualPageNumber = offset / limit + 1;
    const lastPageNumber = Math.ceil(count / limit);

    let isPenultNotButton = actualPageNumber + 3 !== lastPageNumber;

    let startIterNumber = 2;
    let endIterNumber = startIterNumber + 3;

    if (lastPageNumber !== 2) {
      if (lastPageNumber < 7) {
        endIterNumber = lastPageNumber - 1;
      } else {
        if (actualPageNumber > 4) {
          const noButton = document.createElement('div');
          noButton.classList.add(...paginationStyles.noButton);
          noButton.textContent = '...';
          otherButtons.push(noButton);
          startIterNumber = actualPageNumber - 1;
          endIterNumber = actualPageNumber + 1;
        }
        if (actualPageNumber + 3 >= lastPageNumber) {
          isPenultNotButton = false;
          startIterNumber = lastPageNumber - 4;
          endIterNumber = lastPageNumber - 1;
        }
      }

      for (let pageNumber = startIterNumber; pageNumber <= endIterNumber; pageNumber++) {
        const button = this.createButton(String(pageNumber));
        otherButtons.push(button);

        if (pageNumber === actualPageNumber) {
          button.classList.add(...paginationStyles.activeButton);
        }
      }

      if (isPenultNotButton) {
        const noButton = document.createElement('div');
        noButton.classList.add(...paginationStyles.noButton);
        noButton.textContent = '...';
        otherButtons.push(noButton);
      }
    }

    return otherButtons;
  }

  /**
   * Updated pagination buttons.
   * @param paginationParams Pagination Params.
   */
  public updatePagination(paginationParams: PaginationResponseParams): void {
    this.paginationParams = paginationParams;
    const { limit, offset, count } = this.paginationParams;

    const actualPageNumber = offset / limit + 1;
    const lastPageNumber = Math.ceil(count / limit);

    if (this.buttons === undefined) {
      throw new Error('component not mounted');
    }

    this.buttons.otherButtonsContainer.innerHTML = '';

    const firstPageButton = this.createButton('1');
    const lastPageButton = this.createButton(String(lastPageNumber));

    if (actualPageNumber > 1) {
      this.buttons.prev.disabled = false;
    } else {
      firstPageButton.classList.add(...buttonActiveClasses);
      this.buttons.prev.disabled = true;
    }

    if (lastPageNumber === 1) {
      this.buttons.otherButtonsContainer.append(firstPageButton);
      this.buttons.next.disabled = true;
      return void 0;
    }

    if (actualPageNumber === lastPageNumber) {
      this.buttons.next.disabled = true;
      lastPageButton.classList.add(...buttonActiveClasses);
    } else {
      this.buttons.next.disabled = false;
    }

    const otherButtons = this.generateOtherButtons();

    this.buttons.otherButtonsContainer.append(
      firstPageButton,
      ...otherButtons,
      lastPageButton,
    );
  }

  private onClick(event: MouseEvent): void {
    const { offset, limit } = this.paginationParams;

    if (this.buttons === undefined) {
      throw new Error('buttons not created');
    }

    if (event.target === null) {
      throw new Error('Target null');
    }

    switch (event.target) {
      case this.buttons.prev:
        this.changeMethod({
          ...this.paginationParams,
          offset: offset - limit,
        });
        break;

      case this.buttons.next:
        this.changeMethod({
          ...this.paginationParams,
          offset: offset + limit,
        });
        break;

      default:
        if (event.target instanceof HTMLButtonElement) {
          this.changeMethod({
            ...this.paginationParams,
            offset: (Number(event.target.textContent) - 1) * limit,
          });
        }
        break;
    }
  }

  /** Initialize the pagination component. */
  public initializePagination(): void {
    this.root = document.createElement('div');
    this.root.classList.add('flex', 'justify-center', 'm-1');

    const otherButtonsContainer = document.createElement('div');
    otherButtonsContainer.classList.add('flex');

    this.buttons = {
      prev: this.createButton(prevButtonContent),
      next: this.createButton(nextButtonContent),
      otherButtonsContainer,
    };

    this.buttons.next.disabled = true;
    this.buttons.prev.disabled = true;

    this.buttons.otherButtonsContainer.append();

    this.root.append(
      this.buttons.prev,
      this.buttons.otherButtonsContainer,
      this.buttons.next,
    );

    this.root.addEventListener('click', event => {
      if (event instanceof MouseEvent) {
        this.onClick(event);
      }
    });
  }
}
