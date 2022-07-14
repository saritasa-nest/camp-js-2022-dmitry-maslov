import { Anime } from '@js-camp/core/models/anime';

import { tableStyles } from '../../constants/styles/animeTable';

import { createAnimeTableElement } from './animeTableElement';

/** Generates and updates table elements. */
export class TableElements {
  private root?: HTMLElement;

  /** Getting html tbody tag. */
  public getElement(): HTMLElement {
    if (this.root === undefined) {
      throw new Error(`${this} - method mount not called`);
    }

    return this.root;
  }

  /**
   * Updates the table elements at the root element.
   * @param elementsData Array of objects to convert to table elements.
   */
  public updateTableElements(elementsData: Anime[]): void {
    if (this.root === undefined) {
      throw new Error(`${this} not mounted`);
    }

    this.root.innerHTML = '';
    elementsData.forEach(elementData => {
      this.root?.append(createAnimeTableElement(elementData));
    });
  }

  /** Creates a root html element. */
  public initializeTableBody(): void {
    this.root = document.createElement('tbody');
    this.root.classList.add(...tableStyles.tbody);
  }
}
