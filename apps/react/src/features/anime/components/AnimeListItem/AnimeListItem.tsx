import { FC, memo } from 'react';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';

/** Anime list item props. */
interface AnimeListItemProps {

  /** Anime. */
  readonly anime: AnimeBase;
}

const AnimeListItemComponent: FC<AnimeListItemProps> = ({ anime }) => (
  <ListItem>
    <Avatar src={anime.image} />
    <ListItemText
      primary={anime.titleEng}
      secondary={<>
        <Typography
          component='span'
        ></Typography>
      </>}
    ></ListItemText>
  </ListItem>
);

export const AnimeListItem = memo(AnimeListItemComponent);
