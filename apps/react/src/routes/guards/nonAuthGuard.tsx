import { useAppSelector } from '@js-camp/react/store';
import { selectUser } from '@js-camp/react/store/auth/selectors';
import { FC } from 'react';
import { Navigate, Outlet, To, useSearchParams } from 'react-router-dom';

export const NonAuthGuard: FC = () => {
  const user = useAppSelector(selectUser);
  const [search] = useSearchParams();

  if (user != null) {
    const pathname = search.get('next') ?? '';
    search.delete('next');

    const redirect: To = {
      pathname,
      search: search.toString(),
    };

    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
