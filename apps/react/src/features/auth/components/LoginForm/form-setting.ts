import { Login } from '@js-camp/core/models/login';
import { VALIDATION_ERROR_TEXT } from '@js-camp/react/constants/validationErrorText';
import * as Yup from 'yup';

export type LoginFormValue = Login;

export const initialValues: LoginFormValue = {
  email: '',
  password: '',
};

export const loginFormSchema: Yup.SchemaOf<LoginFormValue> = Yup.object().shape(
  {
    email: Yup.string()
      .email(VALIDATION_ERROR_TEXT.InvalidEmail)
      .required(VALIDATION_ERROR_TEXT.Required),
    password: Yup.string().required(VALIDATION_ERROR_TEXT.Required),
  },
);
