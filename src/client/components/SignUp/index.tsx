import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import SignUpForm from './views/SignUpForm';
import { ISignUpRequest } from 'models/signup';
import { Account } from 'models/shared/account';
import AccountComponent from 'shared/Components/Account';
import { signUpActions } from './actions';
import { getPageTitle } from 'utils/getPageTitle';

interface PropTypes {
  isLoading: boolean,
  signUp: Account
}

type Props =
  PropTypes
  & typeof signUpActions;

class SignUpComponent extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    document.title = getPageTitle(this.props.signUp.title);
  }

  public render() {
    const { signUp, isLoading } = this.props;
    return (
      <AccountComponent
        isLoading={isLoading}
        account={signUp}
        bottomUrl="/signIn"
      >
        <SignUpForm onSubmit={this.submit} />
      </AccountComponent>
    );
  }

  private submit = (values: ISignUpRequest) => {
    this.props.signUpAction(values);
  }
}

export default connect(
  (state: ApplicationState) => ({
    isLoading: state.signUp.isLoading,
    signUp: state.initial.signUp
  }),
  signUpActions
)(SignUpComponent as any) as any;
