import {
  AnimeOrder,
  AnimeOrders,
  AnimeNotOrder,
  AnimeReversedOrder,
} from '@js-camp/core/enums/anime/ordering.enum';

import { elementStyles, headerStyles, tableStyles } from './animeTable.styles';

interface AnimeTableHeaderProps {

  /** Causes the parent component to change the sort option. */
  updateMethod(order: AnimeOrders): void;
}

/**
 * Created table headers, is responsible for sorting.
 */
export class AnimeTableHeader {
  private root?: HTMLElement;

  private headers?: Header[];

  private updateMethod: (order: AnimeOrders) => void;

  private setOrderInHeader(header: Header): void {
    const { order, reverseOrder, status } = header;

    this.resetHeadersStatus();

    if (order !== undefined && reverseOrder !== undefined) {
      switch (status) {
        case SortStatus.Not:
          this.updateMethod(order);
          header.status = SortStatus.Sort;
          break;

        case SortStatus.Sort:
          this.updateMethod(reverseOrder);
          header.status = SortStatus.Reverse;
          break;

        case SortStatus.Reverse:
          this.updateMethod(AnimeNotOrder.NotOrder);
          header.status = SortStatus.Not;
          break;

        default:
          break;
      }
    }
  }

  public constructor(props: AnimeTableHeaderProps) {
    this.updateMethod = props.updateMethod;
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

  /**
   * Updates header elements.
   */
  public update(): void {
    if (this.headers === undefined) {
      throw new Error(`${this} not mounted`);
    }
    this.headers.forEach(header => {
        switch (header.status) {
          case SortStatus.Sort:
            if (header.statusIndicator) {
              header.statusIndicator.textContent = '(increase sort)';
            }
            break;
          case SortStatus.Reverse:
            if (header.statusIndicator) {
              header.statusIndicator.textContent = '(descending sort)';
            }
            break;
          case SortStatus.Not:
            if (header.statusIndicator) {
              header.statusIndicator.textContent = '';
            }
            break;
          default: break;
        }
    });
  }

  /**
   * Return dom instance component.
   * @returns Dom instance component.
   */
  public getElement(): HTMLElement {
    if (this.root === undefined) {
      throw new Error(`${this} not called mount`);
    }

    return this.root;
  }

  /**
   * Mount component in dom tree.
   */
  public mount(): void {
    this.root = document.createElement('thead');
    this.root.classList.add(...tableStyles.thead);

    const row = document.createElement('tr');
    row.classList.add(...tableStyles.row);

    this.headers = [
      {
        headerEl: createColHeader({
          headerTitle: 'Photo',
          styles: tableStyles.imageCol,
        }),
      },
      {
        headerEl: createColHeader({ headerTitle: 'English title', isSortHeader: true }),
        order: AnimeOrder.TitleEng,
        reverseOrder: AnimeReversedOrder.ReversedTitleEng,
        status: SortStatus.Not,
      },
      {
        headerEl: createColHeader({ headerTitle: 'Status', isSortHeader: true }),
        order: AnimeOrder.Status,
        reverseOrder: AnimeReversedOrder.ReversedStatus,
        status: SortStatus.Not,
      },
      {
        headerEl: createColHeader({ headerTitle: 'Aired start', isSortHeader: true }),
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
 * @returns
 */
function createColHeader({ headerTitle, styles, isSortHeader }:
  {headerTitle: string; styles?: string[]; isSortHeader?: true;}): HTMLElement {
  const colHeader = document.createElement('th');
  colHeader.textContent = headerTitle;

  if (isSortHeader) {
    colHeader.classList.add(...headerStyles.sortedHeader, ...elementStyles.col);
  }

  if (styles !== undefined) {
    colHeader.classList.add(...styles);
  }

  return colHeader;

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

/**
 * Contains sort statuses. Used to change sort options.
 */
enum SortStatus {
  Not = 0,
  Sort,
  Reverse,
}
