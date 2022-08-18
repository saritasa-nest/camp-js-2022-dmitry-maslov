import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { AppLoadingSpinner } from '../components/AppLoadingSpinner';

import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <AppLoadingSpinner />,
  },
  ...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
