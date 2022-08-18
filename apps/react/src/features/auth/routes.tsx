import { NonAuthGuard } from '@js-camp/react/routes/guards/nonAutgGuard';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() =>
  import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));

const RegistrationPage = lazy(() => import(`./pages/RegistrationPage`).then(module => ({
  default: module.RegistrationPage,
})));

export const authRoutes: RouteObject[] = [
  {
    element: <NonAuthGuard/>,
    children: [
      {
        path: 'login',
        element: <LoginPage/>,
      },
      {
        path: 'registration',
        element: <RegistrationPage />,
      },
    ],
  },
];
