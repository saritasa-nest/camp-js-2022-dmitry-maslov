import { PaginationRequestParams, PaginationResponseParams } from './AnimeTableComponents/animeTable';

type ChangePaginationMethod = (paginationParams: PaginationRequestParams) => void;

interface PaginationPanelProps {

  /** Method to update pagination data in parent component. */
  readonly changePaginationMethod: ChangePaginationMethod;

  /** Default pagination parameters. */
  readonly defaultPaginationParams: PaginationResponseParams;
}

const paginationStyles = {
  button: ['w-12', 'border', 'disabled:opacity-50'],
  activeButton: ['bg-slate-300'],
  ellipsis: ['w-8', 'text-center'],
};

/** The class creates a pagination panel. */
export class PaginationPanel {
  private root?: HTMLDivElement;

  private paginationParams: PaginationResponseParams;

  private changeMethod: ChangePaginationMethod;

  public constructor(props: PaginationPanelProps) {
    this.changeMethod = props.changePaginationMethod;
    this.paginationParams = props.defaultPaginationParams;
  }

  private getPaginationParams(): PaginationResponseParams {
    return this.paginationParams;
  }

  /** Returns an instance HTML Element.*/
  public getElement(): Element {
    if (this.root === undefined) {
      throw new Error(`${this} component not mount`);
    }
    return this.root;
  }

  /** Initialize the pagination component. */
  public initializePagination(): void {
    this.root = document.createElement('div');
    this.root.classList.add('flex', 'justify-center', 'm-1');

    this.root.addEventListener('click', (event): void => {
      event.preventDefault();

      if (!(event.target instanceof HTMLDivElement)) {
        const targetButton = event.target as HTMLButtonElement;
        this.changeMethod({
          ...this.getPaginationParams(),
            offset: Number(targetButton.value),
        });
      }
    });
  }

  /**
   * Updated pagination buttons.
   * @param paginationParams Pagination Params.
   */
  public updatePaginationElements(paginationParams: PaginationResponseParams): void {
    if (this.root === undefined) {
      throw new Error(`${this} component not initialized`);
    }

    this.paginationParams = paginationParams;

    this.root.innerHTML = '';

    const paginationElements = this.generatePaginationHtmlElements(this.generatePaginationElementsList());
    this.root.append(...paginationElements);
  }

  private range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  }

  private generatePaginationElementsList(): PaginationElement[] {
    const { count, limit } = this.paginationParams;

    const pageCount = Math.ceil(count / limit);
    const activePage = this.getActivePage();
    const boundaryCount = 1;
    const siblingCount = 1;

    const startPages = this.range(1, Math.min(boundaryCount, pageCount));
    const endPages = this.range(Math.max(pageCount - boundaryCount + 1, boundaryCount + 1), pageCount);

    const siblingsStart = Math.max(
      Math.min(
        activePage - siblingCount,
        pageCount - boundaryCount - siblingCount * 2 - 1,
      ),
      boundaryCount + 2,
    );

    const siblingsEnd = Math.min(
      Math.max(
        activePage + siblingCount,
        boundaryCount + siblingCount * 2 + 2,
      ),
      endPages.length > 0 ? endPages[0] - 2 : pageCount - 1,
    );

    const second = function(): PaginationElement[] {
      if (siblingsStart > boundaryCount + 2) {
        return [PaginationElements.Ellipsis];
      }
      if (boundaryCount + 1 < pageCount - boundaryCount) {
        return [boundaryCount + 1];
      }
      return [];
    }();

    const penult = function(): PaginationElement[] {
      if (siblingsEnd < pageCount - boundaryCount - 1) {
        return [PaginationElements.Ellipsis];
      }
      if (pageCount - boundaryCount > boundaryCount) {
        return [pageCount - boundaryCount];
      }
      return [];
    }();

    const itemList: PaginationElement[] = [
      PaginationElements.PreviousButton,
      ...startPages,
      ...second,
      ...this.range(siblingsStart, siblingsEnd),
      ...penult,
      ...endPages,
      PaginationElements.NextButton,
    ];
    return itemList;
  }

  private getPaginationElementContent(paginationElement: PaginationElement): string {
    if (typeof paginationElement === 'number') {
      return String(paginationElement);
    }
    return elementContents[paginationElement as PaginationElements];
  }

  private getPaginationButtonValue(buttonElement: PaginationElement): string {
    if (buttonElement === PaginationElements.NextButton) {
      return String(this.paginationParams.offset + this.paginationParams.limit);
    }
    if (buttonElement === PaginationElements.PreviousButton) {
      return String(this.paginationParams.offset - this.paginationParams.limit);
    }
    return String(buttonElement as number * this.paginationParams.limit - this.paginationParams.limit);
  }

  private generatePaginationHtmlElements(elements: PaginationElement[]): HTMLElement[] {
    return elements.map(element => this.createPaginationHtmlElement(element));
  }

  private getActivePage(): number {
    return this.paginationParams.offset / this.paginationParams.limit + 1;
  }

  private createPaginationHtmlElement(paginationElement: PaginationElement): HTMLButtonElement | HTMLDivElement {
    const content = this.getPaginationElementContent(paginationElement);

    if (paginationElement === PaginationElements.Ellipsis) {
      const element = document.createElement('div');
      element.textContent = content;
      element.classList.add(...paginationStyles.ellipsis);
      return element;
    }

    const button = document.createElement('button');
    button.classList.add(...paginationStyles.button);
    button.type = 'button';
    button.value = this.getPaginationButtonValue(paginationElement);
    button.textContent = content;

    const numberButtonValue = Number(button.value);

    if (numberButtonValue === this.paginationParams.offset) {
      button.classList.add(...paginationStyles.activeButton);
    }

    if (numberButtonValue < 0 || numberButtonValue >= this.paginationParams.count) {
      button.disabled = true;
    }

    return button;
  }
}

type PaginationElement = PaginationElements | number;

/** Describes the type of the pagination element if it is not number. */
enum PaginationElements {
  Ellipsis = 'ellipsis',
  NextButton = 'next-button',
  PreviousButton = 'previous-button',
}

const elementContents = {
  [PaginationElements.Ellipsis]: '...',
  [PaginationElements.NextButton]: '>>',
  [PaginationElements.PreviousButton]: '<<',
};
