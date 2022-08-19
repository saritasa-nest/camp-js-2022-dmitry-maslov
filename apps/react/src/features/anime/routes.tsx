import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthGuard } from '@js-camp/react/routes/guards/authGuard';

const AnimeListPage = lazy(() =>
  import('./pages/AnimeListPage').then(module => ({ default: module.AnimeListPage })));

export const animeRoutes: RouteObject[] = [
  {
    element: <AuthGuard/>,
    children: [
      {
        path: '*',
        element: <AnimeListPage />,
      },
    ],
  },
];
