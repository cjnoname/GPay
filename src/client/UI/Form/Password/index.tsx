import * as React from 'react';
import { Field } from 'redux-form';
import PasswordAdornment from './PasswordAdornment';

interface Props {
  name: string,
  label: string,
  [rest: string]: any
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error, invalid },
  ...custom
}: any) => (
    <PasswordAdornment
      error={touched && invalid}
      label={label}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );

const TextFieldUI = (props: Props) => {
  const { ...rest } = props;
  return (
    <Field name={props.name} component={renderTextField} label={props.label} {...rest} />
  );
};

export default TextFieldUI;
