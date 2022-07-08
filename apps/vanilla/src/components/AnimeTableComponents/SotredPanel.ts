import {
  AnimeOrder,
  AnimeOrders,
  AnimeReversedOrder,
} from '@js-camp/core/enums/anime/ordering.enum';

import { $, Dom } from '../../core/Dom';

import { AnimeNotOrder } from './../../../../../libs/core/enums/anime/ordering.enum';

interface AnimeTableHeaderProps {
  order: AnimeOrders;
  setOrder(order: AnimeOrders): void;
}

export class AnimeTableHeaderComponent {
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

  public update(order: AnimeOrders): void {

    // Чистим стили кнопок и вешаем стиль на активную, если таковая имеется
    this.headers.forEach(header => {
      if (order === header.order || order === header.reverseOrder) {
        switch (header.status) {
          case SortStatus.Sort:
            // Ставим стиль для возрастания
            break;
          case SortStatus.Reverse:
            // Ставим стиль для убывания
            break;
          default:
            break;
        }
      }
    });
  }

  public getElements(): Dom {
    return this.$root;
  }

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
  /** */
  $header: Dom;
  status?: SortStatus;
  order?: AnimeOrders;
  reverseOrder?: AnimeOrders;
}

enum SortStatus {
  Not = 0,
  Sort,
  Reverse,
}
