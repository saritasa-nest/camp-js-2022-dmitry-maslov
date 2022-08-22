import { TextField, TextFieldProps } from 'formik-mui';
import { FC, memo } from 'react';

type Props = TextFieldProps;

const PasswordFieldComponent: FC<Props> = props => (
  <TextField
    {...props}
    type="password"
    label={props.label ?? 'Password'}
    autoComplete="current-password"
  />
);

export const PasswordField = memo(PasswordFieldComponent);
