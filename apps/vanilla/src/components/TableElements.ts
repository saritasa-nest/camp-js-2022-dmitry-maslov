import { ListAnime } from '@js-camp/core/models/listAnime';

import { $createAnimeTableElement } from './AnimeTableComponents/animeTableElement';

export class TableElements {
  private $root?: HTMLElement;

  private updateFunction: () => void;

  public constructor(updateFunction: () => void) {
    this.updateFunction = updateFunction;
  }

  private getEl(): HTMLElement {
    if (this.$root === undefined) {
      throw new Error(`${this} - method mount not called`);
    }

    return this.$root;
  }

  private update(elementsData: ListAnime[]): void {
    if (this.$root === undefined) {
      throw new Error(`${this} not mounted`);
    }

    this.$root.innerHTML = '';
    elementsData.forEach(elementData => {
      this.$root?.append($createAnimeTableElement(elementData));
    });
  }

  private mount(): void {
    this.$root = document.createElement('tbody');
  }
}
