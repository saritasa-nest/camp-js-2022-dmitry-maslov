/* eslint-disable max-lines-per-function */
import { memo, useEffect, FC } from 'react';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { TextField } from 'formik-mui';
import { Alert, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { Login } from '@js-camp/core/models/login';
import { AppValidationError } from '@js-camp/core/models/app-error';
import { PasswordField } from '@js-camp/react/components';

import { initialValues, loginFormSchema, LoginFormValue } from './form-setting';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(AuthActions.resetAuthErrorAndLoading());
    return () => {
      dispatch(AuthActions.resetAuthErrorAndLoading());
    };
  }, []);

  const handleLoginButtonClick = (value: LoginFormValue) => {
    dispatch(AuthActions.loginUser(value));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleLoginButtonClick,
    validationSchema: loginFormSchema,
  });

  useEffect(() => {
    if (error !== undefined && error instanceof AppValidationError<Login>) {
      formik.setErrors(error.validationData);
    }
    formik.setSubmitting(false);
  }, [error]);

  return (
    <FormikProvider value={formik}>
      <Box component={Form}>
        {error !== undefined && !(error instanceof AppValidationError) ?
          <Alert severity="error">Wrong email or password</Alert> :
            undefined
        }
        <Field
          component={TextField}
          name="email"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          autoFocus
        />
        <Field
          component={PasswordField}
          name='password'
          margin="normal"
          required
          fullWidth
        />
        <LoadingButton
          loading={isLoading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
      </Box>
    </FormikProvider>
  );
};

export const LoginForm = memo(LoginFormComponent);
