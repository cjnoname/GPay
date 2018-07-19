import { Action, Reducer } from 'redux';
import { KnownAction, ActionTypes } from './actions';
import * as reducer from './workers/signIn';
import { SignInState } from 'models/signIn';

export const SignInReducer: Reducer<SignInState> = (state: SignInState | undefined, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionTypes.SIGNIN_STARTED: { return reducer.signInStarted(state!); }
    case ActionTypes.SIGNIN_FAILED: { return reducer.signInFailed(state!); }
  }
  return state || new SignInState();
};
