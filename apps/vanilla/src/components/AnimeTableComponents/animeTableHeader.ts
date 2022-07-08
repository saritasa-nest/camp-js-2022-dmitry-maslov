import {
  AnimeOrder,
  AnimeOrders,
} from '@js-camp/core/enums/anime/ordering.enum';

import { Dom, $ } from '../../core/Dom';

import { AnimeReversedOrder } from './../../../../../libs/core/enums/anime/ordering.enum';

interface SortTableHeaderMethods {
  setOrder(order: AnimeOrders): void;
  setSortElementsStatus(): void;
}

interface SortTableHeaderProps {
  order: AnimeOrders;
  updateOrder(order: AnimeOrders): void;
}

/**
 * Created table headers, is responsible for sorting.
 */
export class SortTableHeader {
  private $root?: Dom;

  private $row?: Dom;

  private elements: SortHeader[];

  private methods: SortTableHeaderMethods;

  private props: SortTableHeaderProps;

  public constructor(props: SortTableHeaderProps) {
    this.props = props;
    this.methods = {
      setOrder: (order: AnimeOrders) => {
        this.props.updateOrder(order);
      },
      setSortElementsStatus: (): void => {
        const { order } = this.props;

        if (order === AnimeOrder.NotOrder) {
          return void 0;
        }

        for (let index = 0; index < this.elements.length; index++) {
          const el = this.elements[index];

          if (order === el.reverseOrder || order === el.order) {

            if (order in AnimeOrder) {
              el.status = SortStatus.Sort;
            } else if (order in AnimeReversedOrder) {
              el.status = SortStatus.Reverse;
            }

            break;
          }
        }

      },
    };

    this.elements = [
      {
        $header: $.create('th').setTextContent('English Title'),
        $status: $.create('div'),
        status: SortStatus.Not,
        order: AnimeOrder.TitleEng,
        reverseOrder: AnimeReversedOrder.ReversedTitleEng,
      },
      {
        $status: $.create('div'),
        status: SortStatus.Not,
        $header: $.create('th').setTextContent('status'),
        order: AnimeOrder.Status,
        reverseOrder: AnimeReversedOrder.ReversedStatus,
      },
      {
        $status: $.create('div'),
        status: SortStatus.Not,
        $header: $.create('th').setTextContent('Aired Start Year'),
        order: AnimeOrder.AiredStart,
        reverseOrder: AnimeReversedOrder.ReversedAiredStart,
      },
    ];
  }

  public getElement() {
    return this.$root;
  }

  public update() {
    //
  }

  public mount() {
    this.$root = $.create('thead');
    this.$row = $.create('tr', 'flex');

    const $photoCol = $.create('th').setTextContent('Photo');

    this.$row.append($photoCol);

    this.$root.append(this.$row);
  }
}
interface SortHeader {
  $header: Dom;
  $status: Dom;
  status: SortStatus;
  order: AnimeOrder;
  reverseOrder: AnimeReversedOrder;
}

enum SortStatus {
  Not = 0,
  Sort,
  Reverse,
}
