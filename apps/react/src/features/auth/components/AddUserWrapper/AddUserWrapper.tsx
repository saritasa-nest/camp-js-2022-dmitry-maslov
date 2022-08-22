import { UserSecretStorageService } from '@js-camp/react/api/services/userSecretService';
import { useAppDispatch } from '@js-camp/react/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { FC, memo, ReactNode, useEffect } from 'react';

interface AddUserWrapperProps {

  /** Children. */
  readonly children: readonly ReactNode[];
}

const AddUserWrapperComponent: FC<AddUserWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (UserSecretStorageService.isUserSecretSaved()) {
      dispatch(AuthActions.fetchUser());
    }
  }, []);

  return <>{children}</>;
};

export const AddUserWrapper = memo(AddUserWrapperComponent);
