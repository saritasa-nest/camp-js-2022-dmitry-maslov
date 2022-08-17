import { memo, useEffect, FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { AppLoadingSpinnerComponent } from '@js-camp/react/components/AppLoadingSpinner';

import { initValues, loginFormSchema, LoginFormValue } from './form-setting';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(
    state => state.auth,
  );

  useEffect(() => {
  }, [error]);

  const handleUserLogin = (value: LoginFormValue): void => {
    dispatch(AuthActions.loginUser(value));
  };

  if (isLoading) {
    return <AppLoadingSpinnerComponent></AppLoadingSpinnerComponent>;
  }

  return (
    <Formik
      initialValues={initValues}
      validationSchema={loginFormSchema}
      onSubmit={value => handleUserLogin(value)}
    >
      <Box component={Form} sx={{ mt: 1 }}>
        <Field
          name="email"
          as={TextField}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
        />
        <ErrorMessage name="email"></ErrorMessage>
        <Field
          as={TextField}
          htmlFor="password"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
        Sign In
        </Button>
      </Box>
    </Formik>
  );
};

export const LoginForm = memo(LoginFormComponent);
