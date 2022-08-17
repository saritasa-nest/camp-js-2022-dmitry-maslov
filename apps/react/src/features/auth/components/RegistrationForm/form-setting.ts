import { Registration } from '@js-camp/core/models/registration';
import * as Yup from 'yup';

/** Login form. */
export type RegistrationFormValue = Registration & { confirmPassword: string; };

export const initValues: RegistrationFormValue = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
};

export const registrationFormSchema: Yup.SchemaOf<RegistrationFormValue> =
  Yup.object().shape({
    email: Yup.string().email('Invalid email')
      .required('Required'),
    password: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref('password')], 'Passwords must match'),

    avatarUrl: Yup.string().notRequired(),
  });
