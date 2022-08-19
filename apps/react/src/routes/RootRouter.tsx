import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import { animeRoutes } from '../features/anime/routes';
import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
  ...animeRoutes,
  ...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
