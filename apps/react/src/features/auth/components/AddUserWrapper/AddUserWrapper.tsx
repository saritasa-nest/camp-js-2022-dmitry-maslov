import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

import { useAppDispatch } from '@js-camp/react/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { FC, memo, useEffect } from 'react';

import { UserSecretStorageService } from '../../../../api/services/userSecretService';

interface Props {
  readonly children: ReactJSXElement;
}

const AddUserWrapperComponent: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('here');
    if (UserSecretStorageService.isUserSecretSaved()) {
      dispatch(AuthActions.fetchUser());
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export const AddUserWrapper = memo(AddUserWrapperComponent);
