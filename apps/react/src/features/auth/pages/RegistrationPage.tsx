import { Box, Button } from '@mui/material';
import { FC, memo } from 'react';
import { Link } from 'react-router-dom';

import { RegistrationForm } from '../components/RegistrationForm/RegistrationForm';

const RegistrationPageComponent: FC = () => (
  <Box>
    <RegistrationForm />
    <Button
      component={Link}
      color="inherit"
      variant="outlined"
      to="/login"
    >
        I have account
    </Button>
  </Box>
);

export const RegistrationPage = memo(RegistrationPageComponent);
