import { InitialState } from 'models/initial';
import { InitialReducer } from './components/Initial/reducers';
import { SignInState } from 'models/signIn';
import { SignInReducer } from './components/SignIn/reducers';
import { SignUpState } from 'models/signUp';
import { SignUpReducer } from './components/SignUp/reducers';
import { ForgotPasswordState } from 'models/forgotPassword';
import { ForgotPasswordReducer } from './components/ForgotPassword/reducers';
import { GooglePayState } from 'models/googlePay';
import { GooglePayReducer } from './components/GooglePay/reducers';

// The top-level state object
export interface ApplicationState {
  initial: InitialState,
  signIn: SignInState,
  signUp: SignUpState,
  forgotPassword: ForgotPasswordState,
  googlePay: GooglePayState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  initial: InitialReducer,
  signIn: SignInReducer,
  signUp: SignUpReducer,
  forgotPassword: ForgotPasswordReducer,
  googlePay: GooglePayReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
