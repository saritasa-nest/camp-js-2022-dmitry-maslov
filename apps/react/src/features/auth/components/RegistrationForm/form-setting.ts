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
      .email(VALIDATION_ERROR_TEXT.invalidEmail)
      .required(VALIDATION_ERROR_TEXT.required),
    password: Yup.string().required(VALIDATION_ERROR_TEXT.required),
    firstName: Yup.string().required(VALIDATION_ERROR_TEXT.required),
    lastName: Yup.string().required(VALIDATION_ERROR_TEXT.required),
    confirmPassword: Yup.string()
      .required(VALIDATION_ERROR_TEXT.required)
      .oneOf([Yup.ref('password')], VALIDATION_ERROR_TEXT.passwordsNotMatch),

    avatarUrl: Yup.string().notRequired(),
  });
