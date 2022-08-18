import { Login } from '@js-camp/core/models/login';
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
      .email('Invalid email')
      .required('This field is required'),
    password: Yup.string().required('This field is required'),
  },
);
