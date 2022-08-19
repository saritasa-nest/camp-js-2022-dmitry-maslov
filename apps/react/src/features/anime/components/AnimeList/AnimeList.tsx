import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { List } from '@mui/material';
import { FC, memo } from 'react';

const AnimeListComponent: FC = () => {
  // const anime = useAppSelector();
  const dispatch = useAppDispatch();

  return <List>Hello man</List>;
};

export const AnimeList = memo(AnimeListComponent);
