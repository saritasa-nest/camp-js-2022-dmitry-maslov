import {
  AnimeOrder,
  AnimeOrders,
  AnimeNotOrder,
  AnimeReversedOrder,
} from '@js-camp/core/enums/anime/ordering.enum';

import { $, Dom } from '../../core/Dom';

interface AnimeTableHeaderProps {

  /** Sort order param. */
  order: AnimeOrders;

  /** Causes the parent component to change the sort option. */
  setOrder(order: AnimeOrders): void;
}

/**
 * Created table headers, is responsible for sorting.
 */
export class AnimeTableHeader {
  private $root: Dom;

  private $row: Dom;

  private props: AnimeTableHeaderProps;

  private headers: Header[];

  private setOrderInHeader(header: Header): void {
    const { order, reverseOrder, status } = header;

    this.resetHeadersStatus();

    if (order !== undefined && reverseOrder !== undefined) {
      switch (status) {
        case SortStatus.Not:
          this.props.setOrder(order);
          header.status = SortStatus.Sort;
          break;

        case SortStatus.Sort:
          this.props.setOrder(reverseOrder);
          header.status = SortStatus.Reverse;
          break;

        case SortStatus.Reverse:
          this.props.setOrder(AnimeNotOrder.NotOrder);
          header.status = SortStatus.Not;
          break;

        default:
          break;
      }
    }
  }

  public constructor(props: AnimeTableHeaderProps) {
    this.props = props;

    this.$root = $.create('thead');
    this.$row = $.create('tr', 'flex justify-between');
    this.headers = [
      {
        $header: $.create('th').setTextContent('Photo'),
      },
      {
        $header: $.create('th', 'cursor-pointer').setTextContent('English title'),
        order: AnimeOrder.TitleEng,
        reverseOrder: AnimeReversedOrder.ReversedTitleEng,
        status: SortStatus.Not,
      },
      {
        $header: $.create('th').setTextContent('Status'),
        order: AnimeOrder.Status,
        reverseOrder: AnimeReversedOrder.ReversedStatus,
        status: SortStatus.Not,
      },
      {
        $header: $.create('th').setTextContent('Aired start'),
        order: AnimeOrder.AiredStart,
        reverseOrder: AnimeReversedOrder.ReversedAiredStart,
        status: SortStatus.Not,
      },
    ];
  }

  private resetHeadersStatus(): void {
    this.headers.forEach(header => {
      if (header.status) {
        header.status = SortStatus.Not;
      }
    });
  }

  /**
   * Updates header elements.
   * @param order Order.
   */
  public update(order: AnimeOrders): void {
    this.headers.forEach(header => {
      if (order === header.order || order === header.reverseOrder) {
        switch (header.status) {
          case SortStatus.Sort:
            // TODO: Ставим стиль для возрастания
            break;
          case SortStatus.Reverse:
            // TODO: Ставим стиль для убывания
            break;
          default:
            break;
        }
      }
    });
  }

  /**
   * Return dom instance component.
   * @returns Dom instance component.
   */
  public getElements(): Dom {
    return this.$root;
  }

  /**
   * Mount component in dom tree.
   */
  public mount(): void {
    this.headers.forEach(header => {
      const { $header, order } = header;

      if (order !== undefined) {
        $header.$el.addEventListener('click', () => {
          this.setOrderInHeader(header);
        });
      }

      this.$row.append($header);
    });

    this.$root.append(this.$row);
  }
}

interface Header {

  /** Dom Instance Header. */
  $header: Dom;

  /** Status. */
  status?: SortStatus;

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
