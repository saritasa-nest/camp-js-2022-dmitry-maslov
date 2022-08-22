import { FC, memo } from 'react';
import { AnimeBase } from '@js-camp/core/models/anime-base';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { AnimeStatus } from '@js-camp/core/models/anime-status';

/** Anime list item props. */
interface AnimeListItemProps {

  /** Anime. */
  readonly anime: AnimeBase;
}

const AnimeItemTitles = memo(({ anime: { titleEng, titleJpn } }: AnimeListItemProps) => <>
  <Typography
    fontWeight='bold'
    variant="body1"
    noWrap
  >
    {titleEng.length > 0 ? titleEng : titleJpn}
  </Typography>
  {
    titleEng.length > 0 && titleJpn.length > 0 ?
      <Typography
        variant="body2"
        color='gray'
        noWrap
      >
        {titleJpn}
      </Typography> :
      null
  }
</>);

const AnimeItemInformation = memo(({ anime: { type, status } }: AnimeListItemProps) => <>
  <Typography
    component="p"
    variant="body2"
    noWrap
  >
    Type: {AnimeType.toReadable(type)}
  </Typography>
  <Typography
    component="p"
    variant="body2"
    noWrap
  >
    Status: {AnimeStatus.toReadable(status)}
  </Typography>
</>);

const AnimeListItemComponent: FC<AnimeListItemProps> = ({ anime }) => (
  <>
    <ListItem sx={{ cursor: 'pointer', display: 'flex' }}>
      <ListItemAvatar sx={{ m: 1 }}>
        <Avatar src={anime.image} sx={{ width: 80, height: 80 }} />
      </ListItemAvatar>
      <ListItemText
        primary={<AnimeItemTitles anime={anime}/>}
        secondary={<AnimeItemInformation anime={anime}/>}
      >
      </ListItemText>
    </ListItem>
    <Divider variant="inset" />
  </>
);

export const AnimeListItem = memo(AnimeListItemComponent);
