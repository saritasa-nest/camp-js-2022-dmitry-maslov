
/** Not order param. */
export const animeNotSort = '';

/** Order params.*/
export enum AnimeSortField {
  Id = 'id',
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

/** Sort Direction. */
export enum SortDirection {
  NotSorted = '0',
  Increase = 'inc',
  Decrease = 'decr',
}

export const SORT_DIRECTION_READABLE_MAP = {
  [SortDirection.Decrease]: 'Decrease',
  [SortDirection.Increase]: 'Increase',
  [SortDirection.NotSorted]: 'Not sorted',
};
