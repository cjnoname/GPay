import * as React from 'react';
import { Field } from 'redux-form';
import CheckboxAdornment from './CheckboxAdornment';

interface Props {
  name: string,
  label: string,
  [rest: string]: any
}

const renderCheckbox = ({ input, label, required, meta: { touched, error, invalid }, ...custom }: any) => (
  <CheckboxAdornment
    label={label}
    invalid={invalid}
    error={touched && error}
    input={input}
    required={required}
    {...custom}
  />
);

const CheckboxUI = (props: Props) => {
  const { ...rest } = props;
  return (
    <Field name={props.name} component={renderCheckbox} label={props.label} {...rest} />
  );
};

export default CheckboxUI;
