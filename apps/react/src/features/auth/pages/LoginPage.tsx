import { useAppSelector } from '@js-camp/react/store/index';
import { Box, Button } from '@mui/material';
import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm/LoginForm';

export const LoginPageComponent: FC = () => {
  const { error, isAuthorized, isLoading } = useAppSelector(state => state.auth);

  return (
    <Box>
      <pre>
        Error: {JSON.stringify(error, null, 2)}
      </pre>
      <pre>
        Is authorized: {JSON.stringify(isAuthorized)}
      </pre>
      <pre>
        Is loading: {JSON.stringify(isLoading)}
      </pre>
      <LoginForm />
      <Button
        component={RouterLink}
        color="inherit"
        variant="outlined"
        to="/registration"
      >
      Create account
      </Button>
    </Box>
  );
};

export const LoginPage = memo(LoginPageComponent);
