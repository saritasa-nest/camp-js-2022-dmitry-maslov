import { useAppSelector } from '@js-camp/react/store';
import { selectUser } from '@js-camp/react/store/auth/selectors';
import { FC } from 'react';
import {
  Navigate, Outlet, To, useLocation, useSearchParams,
} from 'react-router-dom';

export const AuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  searchParams.append('next', location.pathname);

  const redirect: To = {
    pathname: 'login',
    search: searchParams.toString(),
  };

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
