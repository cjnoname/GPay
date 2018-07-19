import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import SignInForm from './views/SignInForm';
import { ISignInRequest } from 'models/signIn';
import { Account } from 'models/shared/account';
import AccountComponent from 'shared/Components/Account';
import { signInActions } from './actions';
import { getPageTitle } from 'utils/getPageTitle';

interface PropTypes {
  isLoading: boolean,
  signIn: Account
}

type Props =
  PropTypes
  & typeof signInActions;

class SignInComponent extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    document.title = getPageTitle(this.props.signIn.title);
  }

  public submit = (values: ISignInRequest) => {
    // console.log(values);
    this.props.signInAction(values);
  }

  public render() {
    const { isLoading, signIn } = this.props;
    return (
      <AccountComponent
        isLoading={isLoading}
        account={signIn}
        bottomUrl="/signUp"
      >
        <SignInForm onSubmit={this.submit} />
      </AccountComponent>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    isLoading: state.signIn.isLoading,
    signIn: state.initial.signIn
  }),
  signInActions
)(SignInComponent as any) as any;
