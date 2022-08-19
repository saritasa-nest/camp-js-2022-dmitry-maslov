/* eslint-disable max-lines-per-function */
import { memo, useEffect, FC } from 'react';
import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import MuiTextField from '@mui/material/TextField';
import { TextField } from 'formik-mui';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store/store';
import { AuthActions } from '@js-camp/react/store/auth/dispatchers';
import { AppLoadingSpinner } from '@js-camp/react/components/AppLoadingSpinner';
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

  const {
    handleSubmit,
    setErrors,
    touched,
    errors,
    getFieldProps,
  } = useFormik({
    initialValues,
    validateOnChange: true,
    validationSchema: registrationFormSchema,
    onSubmit: handleUserRegistration,
  });

  useEffect(() => {
    if (error != null && error instanceof AppValidationError<Registration>) {
      setErrors(error.validationData);
    }
  }, [error]);

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {isLoading ? (
        <AppLoadingSpinner></AppLoadingSpinner>
      ) : (
        <>
          <MuiTextField
            error={touched.email && errors.email !== undefined}
            helperText={touched.email && errors.email !== undefined ? errors.email : undefined}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...getFieldProps('email')}
          />
          <MuiTextField
            error={Boolean(touched.firstName && errors.firstName != null)}
            helperText={touched.firstName && errors.firstName != null ?
              errors.firstName :
              undefined
            }
            margin="normal"
            required
            fullWidth
            label="First name"
            autoComplete="additional-name"
            {...getFieldProps('firstName')}
          />
          <MuiTextField
            margin="normal"
            required
            fullWidth
            label="Last name"
            autoComplete="family-name"
            {...getFieldProps('lastName')}
            error={Boolean(touched.lastName && errors.lastName != null)}
            helperText={touched.lastName && errors.lastName != null ?
              errors.lastName :
              undefined
            }
          />
          <MuiTextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error={Boolean(touched.password && errors.password != null)}
            helperText={touched.password && errors.password != null ?
              errors.password :
              undefined
            }
            {...getFieldProps('password')}
          />
          <MuiTextField
            error={Boolean(touched.confirmPassword && errors.confirmPassword != null)}
            helperText={ touched.confirmPassword && errors.confirmPassword != null ?
              errors.confirmPassword :
              undefined
            }
            margin="normal"
            required
            fullWidth
            label="Confirm password"
            type="password"
            {...getFieldProps('confirmPassword')}
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

export const RegistrationForm = memo(RegistrationFormComponent);
