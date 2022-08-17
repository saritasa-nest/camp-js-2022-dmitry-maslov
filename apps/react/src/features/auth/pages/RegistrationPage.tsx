import { useAppSelector } from '@js-camp/react/store/index';
import { Button } from '@mui/material';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm';

const RegistrationPageComponent: FC = () => {
  const { error, isAuthorized, isLoading } = useAppSelector(state => state.auth);

  return (
    <div>
      <pre>
        Error: {JSON.stringify(error)}
      </pre>
      <pre>
        Is authorized: {JSON.stringify(isAuthorized)}
      </pre>
      <pre>
        Is loading: {JSON.stringify(isLoading)}
      </pre>
      <RegistrationForm />
      <Button
        component={Link}
        color="inherit"
        variant="outlined"
        to="/login"
      >
        I have account
      </Button>
    </div>
  );
};

export const RegistrationPage = memo(RegistrationPageComponent);
