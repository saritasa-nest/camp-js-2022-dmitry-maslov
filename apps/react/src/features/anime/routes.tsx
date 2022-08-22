import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '@js-camp/react/routes/guards/authGuard';

const AnimePage = lazy(() =>
  import('./pages/AnimePage').then(module => ({ default: module.AnimePage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <AuthGuard/>,
    children: [
      {
        path: '*',
        element: <AnimePage />,
      },
    ],
  },
];
