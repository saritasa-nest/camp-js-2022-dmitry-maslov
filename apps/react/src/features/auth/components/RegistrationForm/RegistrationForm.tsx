/* eslint-disable max-lines-per-function */
import { memo, useEffect, FC } from 'react';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { Registration } from '@js-camp/core/models/registration';

import {
  initialValues,
  RegistrationFormValue,
  registrationFormSchema,
} from './form-setting';

const RegistrationFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(
    state => state.auth,
  );

  useEffect(() => {
    dispatch(AuthActions.resetAuthErrorAndLoading());
    return () => {
    dispatch(AuthActions.resetAuthErrorAndLoading());
  };
}, []);

  const handleUserRegistration = (value: RegistrationFormValue): void => {
    dispatch(AuthActions.registerUser(value));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: registrationFormSchema,
    onSubmit: handleUserRegistration,
  });

  useEffect(() => {
    if (error != null && error instanceof AppValidationError<Registration>) {
      formik.setErrors(error.validationData);
      formik.setSubmitting(false);
    }
  }, [error]);

  return (
    <FormikProvider value={formik}>
      <Box component={Form} sx={{ mt: 1 }}>
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
          name="email"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          label="First name"
          autoComplete="additional-name"
          name="firstName"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          label="Last name"
          autoComplete="family-name"
          name="lastName"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <Field
          component={TextField}
          margin="normal"
          required
          fullWidth
          label="Confirm password"
          type="password"
          name="confirmPassword"
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
            Register
        </LoadingButton>
      </Box>
    </FormikProvider>
  );
};

export const RegistrationForm = memo(RegistrationFormComponent);
