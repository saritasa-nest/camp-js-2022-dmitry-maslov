import {
  AnimeOrder,
  AnimeOrders,
  animeNotOrder,
  AnimeReversedOrder,
} from '@js-camp/core/enums/anime/ordering';

import { headerStyles, tableStyles } from '../../constants/styles/animeTable';
import { decreaseContent } from '../../constants/tableHeaders/tableHeaders';

import { increaseContent } from './../../constants/tableHeaders/tableHeaders';

interface AnimeTableHeaderProps {

  /** Causes the parent component to change the sort option. */
  readonly changeParentOrderParams: (order: AnimeOrders) => void;
}

/** Created table headers, is responsible for sorting. */
export class AnimeTableHeader {
  private root?: HTMLElement;

  private headers?: Header[];

  private changeOrder: (order: AnimeOrders) => void;

  private setOrderInHeader(header: Header): void {
    const { order, reverseOrder, status } = header;

    const newOrder = {
      [SortStatus.Not]: order,
      [SortStatus.Sort]: reverseOrder,
      [SortStatus.Reverse]: animeNotOrder,
    };

    this.resetHeadersStatus();

    if (order !== undefined && reverseOrder !== undefined && status !== undefined) {
      header.status = nextStatus[status];
      this.changeOrder(newOrder[status] as AnimeOrder);
    }
  }

  public constructor(props: AnimeTableHeaderProps) {
    this.changeOrder = props.changeParentOrderParams;
  }

  private resetHeadersStatus(): void {
    if (this.headers === undefined) {
      throw new Error(`${this} not mounted`);
    }

    this.headers.forEach(header => {
      if (header.status) {
        header.status = SortStatus.Not;
      }
    });
  }

  /** Updates header elements.*/
  public updateHeaders(): void {
    if (this.headers === undefined) {
      throw new Error(`${this} not mounted`);
    }
    this.headers.forEach(header => {
      if (header.status !== undefined && header.statusIndicator !== undefined) {
        const indicatorContent = statusIndicatorContent[header.status];
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
        order: AnimeOrder.TitleEng,
        reverseOrder: AnimeReversedOrder.ReversedTitleEng,
        status: SortStatus.Not,
      },
      {
        headerEl: createColumnHeader({
          headerTitle: 'Type',
        }),
      },
      {
        headerEl: createColumnHeader({ headerTitle: 'Status', isSortHeader: true }),
        order: AnimeOrder.Status,
        reverseOrder: AnimeReversedOrder.ReversedStatus,
        status: SortStatus.Not,
      },
      {
        headerEl: createColumnHeader({ headerTitle: 'Aired start', isSortHeader: true }),
        order: AnimeOrder.AiredStart,
        reverseOrder: AnimeReversedOrder.ReversedAiredStart,
        status: SortStatus.Not,
      },
    ];

    this.headers.forEach(header => {
      const { headerEl, order } = header;

      if (order !== undefined) {
        const statusIndicator = document.createElement('span');
        statusIndicator.classList.add('text-sm');
        header.statusIndicator = statusIndicator;

        headerEl.append(statusIndicator);
        headerEl.addEventListener('click', () => {
          this.setOrderInHeader(header);
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

/** Interface describing the table header. */
interface Header {

  /** Dom Instance Header. */
  headerEl: HTMLElement;

  /** Status. */
  status?: SortStatus;

  /** Status indicator element. */
  statusIndicator?: HTMLSpanElement;

  /** Order type in this header.  */
  order?: AnimeOrders;

  /** Reverse Order type in this header. */
  reverseOrder?: AnimeOrders;
}

/** Contains sort statuses. Used to change sort options. */
enum SortStatus {
  Not = 0,
  Sort,
  Reverse,
}

const nextStatus = {
  [SortStatus.Not]: SortStatus.Sort,
  [SortStatus.Sort]: SortStatus.Reverse,
  [SortStatus.Reverse]: SortStatus.Not,
};

const statusIndicatorContent = {
  [SortStatus.Not]: '',
  [SortStatus.Sort]: increaseContent,
  [SortStatus.Reverse]: decreaseContent,
};
