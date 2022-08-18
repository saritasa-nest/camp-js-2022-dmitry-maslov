import { Registration } from '@js-camp/core/models/registration';
import * as Yup from 'yup';

/** Login form. */
export type RegistrationFormValue = Registration & { confirmPassword: string; };

export const initialValues: RegistrationFormValue = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};

export const registrationFormSchema: Yup.SchemaOf<RegistrationFormValue> =
  Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
    firstName: Yup.string().required('This field is required'),
    lastName: Yup.string().required('This field is required'),
    confirmPassword: Yup.string()
      .required('This field is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),

    avatarUrl: Yup.string().notRequired(),
  });
