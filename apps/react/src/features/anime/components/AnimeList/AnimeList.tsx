import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeActions } from '@js-camp/react/store/anime/dispatchers';
import { selectAnime } from '@js-camp/react/store/anime/selectors';
import { List } from '@mui/material';
import { FC, memo, useEffect } from 'react';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

const AnimeListComponent: FC = () => {
  const anime = useAppSelector(selectAnime);

  useEffect(() => {
    dispatch(
      AnimeActions.fetchAnimeList({
        filterParams: {
          search: '',
          type: [],
        },
        paginationParams: {
          limit: 20,
          page: 1,
        },
        sortParams: {
          direction: false,
          sortBy: '',
        },
      }),
    );
  }, []);

  const dispatch = useAppDispatch();

  return (
    <List>
      {anime.map(item => (
        <AnimeListItem anime={item} key={item.id}></AnimeListItem>
      ))}
    </List>
  );
};

export const AnimeList = memo(AnimeListComponent);
