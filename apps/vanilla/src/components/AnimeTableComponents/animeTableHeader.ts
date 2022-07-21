import {
  AnimeSortField,
  SortDirection,
} from '@js-camp/core/enums/anime/sort';

import { headerStyles, tableStyles } from '../../constants/styles/animeTable';
import { decreaseContent } from '../../constants/tableHeaders/tableHeaders';

import { increaseContent } from './../../constants/tableHeaders/tableHeaders';

/** Sort Params. */
export interface SortParams {

  /** Sort field. */
  readonly sortField: AnimeSortField;

  /** Sort direction. */
  sortDirection: SortDirection;
}
interface AnimeTableHeaderProps {

  /** Causes the parent component to change the sort option. */
  readonly changeParentSortParams: (sortParams: SortParams) => void;
}

/** Interface describing the table header. */
interface Header {

  /** Dom Instance Header. */
  readonly headerEl: HTMLElement;

  /** Status indicator element. */
  statusIndicator?: HTMLSpanElement;

  /** Sort params. */
  sortParams?: SortParams;
}

/** Created table headers, is responsible for sorting. */
export class AnimeTableHeader {
  private root?: HTMLElement;

  private headers?: Header[];

  private readonly changeSortParams: (sortParams: SortParams) => void;

  private setSortIndicatorInHeader(header: Header): void {
    if (header.sortParams !== undefined) {
      const { sortDirection } = header.sortParams;

      this.resetHeadersStatus();

      header.sortParams.sortDirection = nextDirection[sortDirection];
      this.changeSortParams(header.sortParams);
    }
  }

  public constructor(props: AnimeTableHeaderProps) {
    this.changeSortParams = props.changeParentSortParams;
  }

  private resetHeadersStatus(): void {
    if (this.headers === undefined) {
      throw new Error(`${this} not mounted`);
    }

    this.headers.forEach(header => {
      if (header.sortParams) {
        header.sortParams.sortDirection = SortDirection.NotSorted;
      }
    });
  }

  /** Updates header elements.*/
  public updateHeaders(): void {
    if (this.headers === undefined) {
      throw new Error(`${this} not mounted`);
    }
    this.headers.forEach(header => {
      if (header.sortParams !== undefined && header.statusIndicator !== undefined) {
        const indicatorContent = statusIndicatorContent[header.sortParams.sortDirection];
        header.statusIndicator.textContent = indicatorContent;
      }
    });
  }

  /** Return dom instance component. */
  public getElement(): HTMLElement {
    if (this.root === undefined) {
      throw new Error(`${this} not called mount`);
    }

    return this.root;
  }

  /** Initialize the table header component. */
  public initializeTableHeader(): void {
    this.root = document.createElement('thead');
    this.root.classList.add(...tableStyles.thead);

    const row = document.createElement('tr');
    row.classList.add(...tableStyles.row);

    this.headers = [
      {
        headerEl: createColumnHeader({
          headerTitle: 'Photo',
          styles: tableStyles.imageColumn,
        }),
      },
      {
        headerEl: createColumnHeader({ headerTitle: 'English title', isSortHeader: true, styles: tableStyles.titleColumn }),
        sortParams: {
          sortField: AnimeSortField.TitleEng,
          sortDirection: SortDirection.NotSorted,
        },
      },
      {
        headerEl: createColumnHeader({
          headerTitle: 'Type',
        }),
      },
      {
        headerEl: createColumnHeader({ headerTitle: 'Status', isSortHeader: true }),
        sortParams: {
          sortDirection: SortDirection.NotSorted,
          sortField: AnimeSortField.Status,
        },
      },
      {
        headerEl: createColumnHeader({ headerTitle: 'Aired start', isSortHeader: true }),
        sortParams: {
          sortDirection: SortDirection.NotSorted,
          sortField: AnimeSortField.AiredStart,
        },
      },
    ];

    this.headers.forEach(header => {
      const { headerEl } = header;

      if (header.sortParams !== undefined) {
        const statusIndicator = document.createElement('span');
        statusIndicator.classList.add('text-sm');
        header.statusIndicator = statusIndicator;

        headerEl.append(statusIndicator);
        headerEl.addEventListener('click', () => {
          this.setSortIndicatorInHeader(header);
        });
      }

      row.append(headerEl);
    });

    this.root.append(row);
  }
}

/**
 * Created header.
 * @param headerParams Title, styles?, isSortedHeader?: true.
 */
function createColumnHeader({ headerTitle, styles, isSortHeader }:
  {headerTitle: string; styles?: string[]; isSortHeader?: true;}): HTMLElement {

  const columnHeader = document.createElement('th');
  columnHeader.textContent = headerTitle;
  columnHeader.classList.add(...tableStyles.column);

  if (isSortHeader) {
    columnHeader.classList.add(...headerStyles.sortedHeader);
  }

  if (styles !== undefined) {
    columnHeader.classList.add(...styles);
  }

  return columnHeader;

}

const nextDirection = {
  [SortDirection.NotSorted]: SortDirection.Increase,
  [SortDirection.Increase]: SortDirection.Decrease,
  [SortDirection.Decrease]: SortDirection.NotSorted,
};

const statusIndicatorContent = {
  [SortDirection.NotSorted]: '',
  [SortDirection.Increase]: increaseContent,
  [SortDirection.Decrease]: decreaseContent,
};
