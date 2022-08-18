import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { authRoutes } from '../features/auth/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/login" />,
  },
  ...authRoutes,
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
