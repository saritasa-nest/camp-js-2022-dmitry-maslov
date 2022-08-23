import { AppLoadingSpinner } from '@js-camp/react/components';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { AnimeListActions } from '@js-camp/react/store/anime/dispatchers';
import { selectAnimeList, selectState } from '@js-camp/react/store/anime/selectors';
import { List } from '@mui/material';
import { FC, memo, useEffect } from 'react';

import { AnimeListItem } from '../AnimeListItem/AnimeListItem';

const AnimeListComponent: FC = () => {
  const { isLoading } = useAppSelector(selectState);
  const animeList = useAppSelector(selectAnimeList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      AnimeListActions.fetchAnimeList({
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

  return (
    <List>
      {animeList.map(anime => (
        <AnimeListItem anime={anime} key={anime.id}></AnimeListItem>
      ))}
      {isLoading ? <AppLoadingSpinner /> : null}
    </List>
  );
};

export const AnimeList = memo(AnimeListComponent);
