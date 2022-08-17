import { memo, useEffect, FC } from 'react';
import { Box, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';

import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';

import { AuthActions } from '@js-camp/react/store/auth/dispatchers';

import { initValues, RegistrationFormValue, registrationFormSchema } from './form-setting';

const RegistrationFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isAuthorized, isLoading } = useAppSelector(
    state => state.auth,
  );

  useEffect(() => {
  }, [error]);

  const handleUserLogin = (value: RegistrationFormValue): void => {
    dispatch(AuthActions.registerUser(value));
  };

  return (
    <Formik
      initialValues={initValues}
      validationSchema={registrationFormSchema}
      onSubmit={value => handleUserLogin(value)}
    >
      <Box component={Form} sx={{ mt: 1 }}>
        <Field
          name="email"
          as={TextField}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
        />
        <ErrorMessage name="email"></ErrorMessage>

        <Field
          name="firstName"
          as={TextField}
          margin="normal"
          required
          fullWidth
          label="First name"
          autoComplete="additional-name"
          autoFocus
        />
        <ErrorMessage name="firstName"></ErrorMessage>

        <Field
          name="lastName"
          as={TextField}
          margin="normal"
          required
          fullWidth
          label="Last name"
          autoComplete="family-name"
          autoFocus
        />
        <ErrorMessage name="lastName"></ErrorMessage>

        <Field
          as={TextField}
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <ErrorMessage name="password"></ErrorMessage>

        <Field
          as={TextField}
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm password"
          type="password"
        />
        <ErrorMessage name="confirmPassword"></ErrorMessage>

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

export const RegistrationForm = memo(RegistrationFormComponent);
