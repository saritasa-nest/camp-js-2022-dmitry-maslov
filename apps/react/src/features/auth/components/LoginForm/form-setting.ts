import { Login } from '@js-camp/core/models/login';
import * as Yup from 'yup';

/** Login form. */
export type LoginFormValue = Login;

export const initValues: LoginFormValue = {
  email: '1dmitrqim@gma.com',
  password: 'asdfasdfaasdf2',
};

export const loginFormSchema: Yup.SchemaOf<LoginFormValue> = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Required'),
  password: Yup.string().required(),
});
