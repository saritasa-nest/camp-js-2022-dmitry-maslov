import { memo, useEffect, FC } from 'react';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { AppLoadingSpinner } from '@js-camp/react/components/AppLoadingSpinner';

import { Login } from '@js-camp/core/models/login';

import { AppValidationError } from '@js-camp/core/models/app-error';

import { initialValues, loginFormSchema, LoginFormValue } from './form-setting';

const LoginFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(state => state.auth);

  const handleUserLogin = (value: LoginFormValue): void => {
    dispatch(AuthActions.loginUser(value));
  };

  useEffect(() => () => {
    dispatch(AuthActions.resetAuthErrorAndLoading());
  }, []);

  const {
    values,
    handleChange,
    handleSubmit,
    setErrors,
    touched,
    errors,
    getFieldProps,
  } = useFormik({
    initialValues,
    onSubmit: handleUserLogin,
    validationSchema: loginFormSchema,
  });

  useEffect(() => {
    if (error !== undefined && error instanceof AppValidationError<Login>) {
      setErrors(error.validationData);
    }
  }, [error]);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {isLoading ? (
        <AppLoadingSpinner></AppLoadingSpinner>
      ) : (
        <>
          {error !== undefined && !(error instanceof AppValidationError) ?
            'Wrong email or password' :
            undefined
          }
          <TextField
            error={Boolean(touched.email && errors.email != null)}
            helperText={
              touched.password && errors.password != null ?
                errors.password :
                undefined
            }
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...getFieldProps('email')}
          />
          <TextField
            error={Boolean(touched.password && errors.password != null)}
            helperText={
              touched.password && errors.password != null ?
                errors.password :
                undefined
            }
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...getFieldProps('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </>
      )}
    </Box>
  );
};

export const LoginForm = memo(LoginFormComponent);
