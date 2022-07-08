/**
 * TODO: DOC.
 */
export type AnimeOrders = '' | AnimeOrder | AnimeReversedOrder | AnimeNotOrder;

export enum AnimeNotOrder {
  NotOrder = '',
}

export enum AnimeOrder {
  TitleEng = 'title_eng',

  TitleJpn = 'title_jpn',

  Synopsis = 'synopsis',

  Status = 'status',

  Source = 'source',

  Rating = 'rating',

  Aired = 'aired',

  AiredStart = 'aired__startswith',

  AiredEnd = 'aired__endswith',

  Created = 'created',

  Modified = 'modified',

}

export enum AnimeReversedOrder {
  ReversedTitleEng = '-title_eng',
  ReversedTitleJpn = '-title_jpn',
  ReversedSynopsis = '-synopsis',
  ReversedStatus = '-status',
  ReversedSource = '-source',
  ReversedRating = '-rating',
  ReversedAired = '-aired',
  ReversedAiredStart = '-aired__startswith',
  ReversedEnd = '-aired__endswith',
  ReversedCreated = '-created',
  ReversedModified = '-modified',
}
