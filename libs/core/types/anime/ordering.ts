import { AnimeNotOrder, AnimeOrder, AnimeReversedOrder } from '../../enums/anime/ordering';

/** All anime orders. */
export type AnimeOrders = AnimeOrder | AnimeReversedOrder | AnimeNotOrder;
