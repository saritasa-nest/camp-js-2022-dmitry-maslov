import { FC, memo } from 'react';

import { AnimeList } from '../components/AnimeList/AnimeList';

const AnimeListPageComponent: FC = () => (<AnimeList></AnimeList>);

export const AnimeListPage = memo(AnimeListPageComponent);
