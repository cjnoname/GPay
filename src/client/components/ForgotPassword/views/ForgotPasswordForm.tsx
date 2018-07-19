import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { ApplicationState } from 'store';
import { Account } from 'models/shared/account';
import { withStyles } from '@material-ui/core/styles';
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
  forgotPassword: Account
}

const decorate = withStyles(() => ({
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
  const field = props.forgotPassword.fields.find((field: Field) => field.name === name);
  if (field) {
    return validateAny(field, value);
  }
};

let ForgotPasswordForm = decorate<Props>(({ handleSubmit, pristine, invalid, submitting, classes, forgotPassword }) => (
  <form onSubmit={handleSubmit}>
    <SimpleFormList
      name="forgotPassword"
      validator={validator}
      classes={classes}
      fields={forgotPassword.fields}
    />
    <div className={classes.button}>
      <Button label={forgotPassword.button} type="submit" className={classes.buttonColor} disabled={submitting || pristine || invalid} fullWidth />
    </div>
  </form>
));

ForgotPasswordForm = reduxForm({
  form: 'forgotPassword',
  enableReinitialize: true
})(ForgotPasswordForm as any) as any;

export default connect(
  (state: ApplicationState) => ({
    forgotPassword: state.initial.forgotPassword
  })
)(ForgotPasswordForm as any) as any;
