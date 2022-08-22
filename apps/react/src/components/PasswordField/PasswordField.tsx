import { FieldHookConfig, useField } from 'formik';
import { TextField, TextFieldProps } from 'formik-mui';
import { FC, memo } from 'react';

type Props = TextFieldProps & FieldHookConfig<{password: string;}>;

const PasswordFieldComponent: FC<Props> = props => {

  const [field, meta] = useField(props);
  return (
    <TextField
      {...props}
      field={field}
      meta={meta}
      label="Password"
      type="password"
      autoComplete="current-password"
    />
  );
};

export const PasswordField = memo(PasswordFieldComponent);
