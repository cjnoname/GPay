import * as React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Field } from 'redux-form';

interface Props {
  name: string,
  label: string,
  required: boolean;
  [rest: string]: any
}

const renderTextField = ({
  input,
  label,
  fullWidth,
  required,
  meta: { touched, error, invalid },
  ...custom
}: any) => (
    <FormControl error={touched && invalid} fullWidth={fullWidth}>
      <InputLabel required={required}>{label}</InputLabel>
      <Input {...input} {...custom} />
      <FormHelperText>{touched && error}</FormHelperText>
    </FormControl>
  );

const TextFieldUI = (props: Props) => {
  const { ...rest } = props;
  return (
    <Field name={props.name} component={renderTextField} label={props.label} {...rest} />
  );
};

export default TextFieldUI;
