import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ApplicationState } from 'store';
import { Account } from 'models/shared/account';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Password } from 'UI/Form';
import { Button } from 'UI/Button';
import { Field } from 'models/shared/field';
import { validateAny } from 'utils/validation';
import SimpleFormList from 'UI/Form/simpleFormList';

interface Props {
  dispatch: any,
  handleSubmit: () => {},
  pristine: boolean,
  submitting: boolean,
  invalid: boolean,
  error: any,
  signIn: Account
}

const decorate = withStyles(({ mixins, spacing }) => ({
  marginTop: {
    marginTop: '1em'
  },
  button: {
    textAlign: 'right' as 'right',
    width: '100%',
    marginTop: '2em'
  },
  buttonColor: {
    color: '#fff'
  }
}));

export const validator = (value: any, values: any, props: Props, name: string) => {
  const field = props.signIn.fields.find((field: Field) => field.name === name);
  if (field) {
    return validateAny(field, value);
  }
};

let SignInForm = decorate<Props>(({ dispatch, handleSubmit, pristine, invalid, submitting, error, classes, signIn }) => (
  <form onSubmit={handleSubmit}>
    <SimpleFormList
      name="signIn"
      validator={validator}
      classes={classes}
      fields={signIn.fields}
    />
    <div className={classes.button}>
      <Button label={signIn.button} type="submit" className={classes.buttonColor} disabled={submitting || pristine || invalid} fullWidth />
    </div>
  </form>
));

SignInForm = reduxForm({
  form: 'login',
  enableReinitialize: true
})(SignInForm as any) as any;

export default connect(
  (state: ApplicationState) => ({
    signIn: state.initial.signIn
  })
)(SignInForm as any) as any;
