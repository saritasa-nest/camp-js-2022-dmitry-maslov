import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { FC, memo } from 'react';

const AnimeListComponent: FC = () => {
  // const anime = useAppSelector();
  const dispatch = useAppDispatch();

  return <>Hello man</>;
};

export const AnimeList = memo(AnimeListComponent);
