import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import FormGroup from '@material-ui/core/FormGroup';
import { ApplicationState } from 'store';
import { CustomerItem } from 'models/shared/customerItem';
import { Account } from 'models/shared/account';
import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from 'UI/Form';
import { Button } from 'UI/Button';
import { Field } from 'models/shared/field';
import { validateAny } from 'utils/validation';
import SimpleFormList from 'UI/Form/simpleFormList';

interface Props {
  dispatch: any,
  handleSubmit: () => {},
  error: any,
  submitting: boolean,
  pristine: boolean,
  invalid: boolean,
  signUp: Account
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
  const field = props.signUp.fields.find((field: Field) => field.name === name);
  if (field) {
    return validateAny(field, value, values);
  } else {
    if (name.includes('consentItems') && !value) {
      return props.signUp.customerConsentItems.get(Number(name.match(/\d/g)))!.requiredPrompt;
    }
  }
};

let SignUpForm = decorate<Props>(({ dispatch, handleSubmit, error, classes, signUp, submitting, pristine, invalid }) => {
  const optInItems = signUp.customerOptInItems;
  const consentItems = signUp.customerConsentItems;

  return (
    <form onSubmit={handleSubmit}>
      <SimpleFormList
        name="signUp"
        validator={validator}
        classes={classes}
        fields={signUp.fields}
      />
      <FormGroup>
        <div className={classes.marginTop}>
          {optInItems.map((optInItem: CustomerItem) => {
            return (
              <div className={classes.marginTop} key={`optInItems${optInItems.indexOf(optInItem)}`}>
                <Checkbox label={optInItem.label} name={`optInItems[${optInItems.indexOf(optInItem)}]`} />
              </div>
            );
          })}
        </div>
        <div className={classes.marginTop}>
          {consentItems.map((consentItem: CustomerItem) => {
            return (
              <div className={classes.marginTop} key={`consentItems${consentItems.indexOf(consentItem)}`}>
                <Checkbox label={consentItem.label} name={`consentItems[${consentItems.indexOf(consentItem)}]`} required validate={validator} />
              </div>
            );
          })}
        </div>
      </FormGroup>
      <div className={classes.button}>
        <Button label={signUp.button} type="submit" className={classes.buttonColor} disabled={submitting || pristine || invalid} fullWidth />
      </div>
    </form>
  );
});

SignUpForm = reduxForm({
  form: 'signUp',
  enableReinitialize: true,
  touchOnChange: true
})(SignUpForm as any) as any;

export default connect(
  (state: ApplicationState) => ({
    optInItems: state.initial.signUp.customerOptInItems,
    consentItems: state.initial.signUp.customerConsentItems,
    signUp: state.initial.signUp
  })
)(SignUpForm as any) as any;
