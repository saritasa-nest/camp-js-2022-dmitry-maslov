import { PaginationRequestParams, PaginationResponseParams } from './animeTable';

type UpdateMethod = (paginationParams: PaginationRequestParams) => void;

interface PaginationPanelProps {

  /**
   * Method to update pagination data in parent component.
   */
  updateMethod: (paginationParams: PaginationRequestParams) => void;

  /**
   * Default pagination parameters;.
   */
  defaultPaginationParams: PaginationResponseParams;
}

const buttonActiveClasses = ['bg-slate-300'];

/**
 * The class creates a pagination panel.
 */
export class PaginationPanel {
  private $root?: Element;

  private maxButtonsCount = 7;

  private paginationParams: PaginationResponseParams;

  private buttons?: {
    next: HTMLButtonElement;
    prev: HTMLButtonElement;
    otherButtonsContainer: HTMLElement;
  };

  private updateMethod: UpdateMethod;

  public constructor(props: PaginationPanelProps) {
    this.updateMethod = props.updateMethod;
    this.paginationParams = props.defaultPaginationParams;
  }

  /**
   * Returns an instance HTML Element.
   * @returns Element. Html Component element.
   */
  public getElement(): Element {
    if (this.$root === undefined) {
      throw new Error(`${this} component not mount`);
    }
    return this.$root;
  }

  private createButton(text: string): HTMLButtonElement {
    const $button = document.createElement('button');

    $button.classList.add('w-12', 'border', 'disabled:opacity-50');
    $button.textContent = text;

    return $button;
  }

  /**
   * Updated pugination buttons.
   * @param paginationParams Pagination Params.
   */
  public update(paginationParams: PaginationResponseParams): void {
    this.paginationParams = paginationParams;
    const { limit, offset, count } = this.paginationParams;

    const actualPageNumber = offset / limit + 1;
    const lastPageNumber = Math.floor(count / limit + (count % limit > 0 ? 1 : 0));

    if (this.buttons === undefined) {
      throw new Error('component not mounted');
    }

    this.buttons.otherButtonsContainer.innerHTML = '';

    const $firstPageButton = this.createButton('1');
    const $lastPageButton = this.createButton(String(lastPageNumber));
    const $otherButtons: HTMLElement[] = [];

    if (actualPageNumber > 1) {
      this.buttons.prev.disabled = false;
    } else {
      $firstPageButton.classList.add(...buttonActiveClasses);
      this.buttons.prev.disabled = true;
    }

    if (lastPageNumber === 1) {
      this.buttons.otherButtonsContainer.append($firstPageButton);
      this.buttons.next.disabled = true;
      return void 0;
    }

    if (actualPageNumber === lastPageNumber) {
      this.buttons.next.disabled = true;
      $lastPageButton.classList.add(...buttonActiveClasses);
    } else {
      this.buttons.next.disabled = false;
    }

    if (lastPageNumber !== 2) {
      const startIterNumber = actualPageNumber;
      const endIterNumber = startIterNumber + this.maxButtonsCount - 2;

      for (let pageNumber = startIterNumber; pageNumber < endIterNumber; pageNumber++) {
        console.log('asdf');
      }
    }

    this.buttons.otherButtonsContainer.append(
      $firstPageButton,
      ...$otherButtons,
      $lastPageButton,
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
        this.updateMethod({
          ...this.paginationParams,
          offset: offset - limit,
        });
        break;

      case this.buttons.next:
        this.updateMethod({
          ...this.paginationParams,
          offset: offset + limit,
        });
        break;

      default:
        if (event.target instanceof HTMLButtonElement) {
          this.updateMethod({
            ...this.paginationParams,
            offset: (Number(event.target.textContent) - 1) * limit,
          });
        }
        break;
    }
  }

  /**
   * Mount the component on the root element.
   */
  public mount(): void {
    this.$root = document.createElement('div');
    this.$root.classList.add('flex', 'justify-center', 'm-1');

    const $otherButtonsContainer = document.createElement('div');
    $otherButtonsContainer.classList.add('flex');

    this.buttons = {
      next: this.createButton('>>'),
      prev: this.createButton('<<'),
      otherButtonsContainer: $otherButtonsContainer,
    };

    this.buttons.next.disabled = true;
    this.buttons.prev.disabled = true;

    this.buttons.otherButtonsContainer.append();

    this.$root.append(
      this.buttons.prev,
      this.buttons.otherButtonsContainer,
      this.buttons.next,
    );

    this.$root.addEventListener('click', event => {
      if (event instanceof MouseEvent) {
        this.onClick(event);
      }
    });
  }
}
