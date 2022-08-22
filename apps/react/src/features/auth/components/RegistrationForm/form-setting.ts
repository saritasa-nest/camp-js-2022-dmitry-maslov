import { Registration } from '@js-camp/core/models/registration';
import { VALIDATION_ERROR_TEXT } from '@js-camp/react/constants/validationErrorText';
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
      .email(VALIDATION_ERROR_TEXT.InvalidEmail)
      .required(VALIDATION_ERROR_TEXT.Required),
    password: Yup.string().required(VALIDATION_ERROR_TEXT.Required),
    firstName: Yup.string().required(VALIDATION_ERROR_TEXT.Required),
    lastName: Yup.string().required(VALIDATION_ERROR_TEXT.Required),
    confirmPassword: Yup.string()
      .required(VALIDATION_ERROR_TEXT.Required)
      .oneOf([Yup.ref('password')], VALIDATION_ERROR_TEXT.PasswordsNotMatch),

    avatarUrl: Yup.string().notRequired(),
  });
