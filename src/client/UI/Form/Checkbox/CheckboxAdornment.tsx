import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const decorate = withStyles(() => ({
  root: {
    display: 'block',
  }
}));

interface Props {
  input: any,
  label: string,
  invalid: boolean,
  required: boolean,
  error: string,
  classes: any,
  [rest: string]: any
}

const CheckboxAdornment = decorate<Props>(({ input, label, required, invalid, error, classes, ...rest }) => (
  <FormControl className={classes.root}>
    <FormControlLabel
      control={
        <Checkbox
          defaultChecked={input.value === true}
          color="primary"
          onBlur={input.onBlur}
          onChange={input.onChange}
          {...rest}
        />
      }
      label={`${required ? '* ' : ''}${label}`}
    />
    <FormHelperText error={invalid}>{error}</FormHelperText>
  </FormControl>
));

export default CheckboxAdornment;
