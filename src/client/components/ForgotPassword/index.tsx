import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from 'store';
import { Account } from 'models/shared/account';
import AccountComponent from 'shared/Components/Account';
import { getPageTitle } from 'utils/getPageTitle';
import { forgotPasswordActions } from './actions';
import ForgotPasswordForm from './views/ForgotPasswordForm';
import { IForgotPasswordRequest } from 'models/forgotPassword';

interface PropTypes {
  isLoading: boolean,
  forgotPassword: Account
}

type Props =
  PropTypes
  & typeof forgotPasswordActions;

class ForgotPasswordComponent extends React.PureComponent<Props, {}> {
  public componentDidMount() {
    document.title = getPageTitle(this.props.forgotPassword.title);
  }

  public submit = (values: IForgotPasswordRequest) => {
    // console.log(values);
    this.props.forgotPasswordAction(values);
  }

  public render() {
    const { isLoading, forgotPassword } = this.props;
    return (
      <AccountComponent
        isLoading={isLoading}
        account={forgotPassword}
        bottomUrl="/signIn"
      >
        <ForgotPasswordForm onSubmit={this.submit} />
      </AccountComponent>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    isLoading: state.forgotPassword.isLoading,
    forgotPassword: state.initial.forgotPassword
  }),
  forgotPasswordActions
)(ForgotPasswordComponent as any) as any;
