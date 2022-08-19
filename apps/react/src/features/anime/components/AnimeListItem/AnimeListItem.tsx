import { FC, memo } from 'react';
import { AnimeBase } from '@js-camp/core/models/anime-base';

/** Anime list item props. */
interface AnimeListItemProps {

  /** Anime. */
  readonly anime: AnimeBase;
}

const AnimeListItemComponent: FC<AnimeListItemProps> = ({ anime }) => (
  <div>
    {anime.titleEng}
  </div>
);

export const AnimeListItem = memo(AnimeListItemComponent);
