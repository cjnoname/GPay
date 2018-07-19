import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Layout } from './components/Layout';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import GooglePay from './components/GooglePay';

export const routes = (
  <Switch>
    <Layout>
      <Route exact path="(/|/googlePay)" component={GooglePay} />
      <Route exact path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgotPassword" component={ForgotPassword} />
    </Layout>
  </Switch>
);

export default hot(module)(() => routes);
