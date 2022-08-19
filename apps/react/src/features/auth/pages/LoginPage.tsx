import { Box, Button } from '@mui/material';
import { FC, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm/LoginForm';

export const LoginPageComponent: FC = () => (
  <Box>
    {/* <LoginFormNew /> */}
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

export const LoginPage = memo(LoginPageComponent);
