import debounce from 'lodash.debounce';

import { filtersStyles } from '../../constants/styles/animeTable';

import {
  FilterParams,
} from './animeTable';

const SEARCH_DEBOUNCE_TIME = 1000;

type UpdateMethod = (filtersParams: FilterParams) => void;

interface FilterPanelProps {

  /** Method to update filters data in parent component. */
  updateMethod: (filtersParams: FilterParams) => void;

  /** Default filter parameters. */
  defaultFilterParams: FilterParams;
}

/** Filters panel processor. */
export class FilterPanel {
  private root?: Element;

  private searchFilter?: HTMLInputElement;

  private updateMethod: UpdateMethod;

  private filtersParams: FilterParams;

  public constructor(props: FilterPanelProps) {
    this.updateMethod = props.updateMethod;
    this.filtersParams = props.defaultFilterParams;
  }

  /**
   * Get filters block.
   * @returns Filter block.
   */
  public getElement(): Element {
    if (this.root === undefined) {
      throw new Error(`${this} component not mount`);
    }
    return this.root;
  }

  /** Create filters block. */
  public createHtml(): void {
    this.root = document.createElement('div');
    this.root.classList.add(...filtersStyles.filtersWrapper);

    const searchFilterContainer = document.createElement('div');
    const searchFilter = document.createElement('input');
    searchFilter.type = 'text';
    searchFilter.classList.add(...filtersStyles.searchFilter);
    searchFilter.placeholder = 'Type to search';
    searchFilterContainer.append(
      searchFilter,
    );
    this.searchFilter = searchFilter;

    this.searchFilter.addEventListener(
      'input',
      debounce(
        () => this.handleSearchChanged(),
        SEARCH_DEBOUNCE_TIME,
      ),
    );
    this.root.append(searchFilterContainer);
  }

  /**
   * Handle search filter changed.
   * Call update method with new search term.
   */
  private handleSearchChanged(): void {
    if (this.searchFilter === undefined) {
      throw new Error('Search filter not created');
    }
    this.filtersParams.searchTerm = this.searchFilter.value;
    this.updateMethod(this.filtersParams);
  }
}
