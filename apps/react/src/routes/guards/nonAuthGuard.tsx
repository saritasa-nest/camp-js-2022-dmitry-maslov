import { useAppSelector } from '@js-camp/react/store';
import { selectUser } from '@js-camp/react/store/auth/selectors';
import { FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export const NonAuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const [search] = useSearchParams();

  if (user != null) {
    const redirect = search.get('next') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
