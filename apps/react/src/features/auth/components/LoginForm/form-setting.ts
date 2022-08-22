import { Login } from '@js-camp/core/models/login';
import { VALIDATION_ERROR_TEXT } from '@js-camp/react/constants/validationErrorText';
import * as Yup from 'yup';

/** Login form. */
export type LoginFormValue = Login;

export const initialValues: LoginFormValue = {
  email: '',
  password: '',
};

export const loginFormSchema: Yup.SchemaOf<LoginFormValue> = Yup.object().shape(
  {
    email: Yup.string()
      .email(VALIDATION_ERROR_TEXT.invalidEmail)
      .required(VALIDATION_ERROR_TEXT.required),
    password: Yup.string().required(VALIDATION_ERROR_TEXT.required),
  },
);
