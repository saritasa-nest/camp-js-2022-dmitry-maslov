import {
  AnimeOrder,
  AnimeNotOrder,
  AnimeReversedOrder,
} from '@js-camp/core/enums/anime/ordering';
import { AnimeOrders } from '@js-camp/core/types/anime/ordering';

import { headerStyles, tableStyles } from '../../constants/styles/animeTable';
import { decreaseContent, increaseContent } from '../../constants/tableHeaders/tableHeaders';

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

    this.resetHeadersStatus();

    if (order !== undefined && reverseOrder !== undefined && status !== undefined) {

      const updateByStatusMethod = {
        [SortStatus.Not]: (): void => {
          this.changeOrder(order);
          header.status = SortStatus.Sort;
        },
        [SortStatus.Sort]: (): void => {
          this.changeOrder(reverseOrder);
          header.status = SortStatus.Reverse;
        },
        [SortStatus.Reverse]: (): void => {
          this.changeOrder(AnimeNotOrder.NotOrder);
          header.status = SortStatus.Not;
        },
      };

      updateByStatusMethod[status]();
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

      if (header.status !== undefined) {
        const changeStatusIndicator = {
          [SortStatus.Sort](): void {
            if (header.statusIndicator) {
              header.statusIndicator.textContent = increaseContent;
            }
          },
          [SortStatus.Reverse](): void {
            if (header.statusIndicator) {
              header.statusIndicator.textContent = decreaseContent;
            }
          },
          [SortStatus.Not](): void {
            if (header.statusIndicator) {
              header.statusIndicator.textContent = '';
            }
          },
        };

        changeStatusIndicator[header.status]();
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
