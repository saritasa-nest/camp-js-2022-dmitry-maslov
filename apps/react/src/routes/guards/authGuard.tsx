import { useAppSelector } from '@js-camp/react/store';
import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation,
} from 'react-router-dom';

export const AuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname,
    }).toString(),
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
