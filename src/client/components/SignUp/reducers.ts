import { Action, Reducer } from 'redux';
import { KnownAction, ActionTypes } from './actions';
import * as reducer from './workers/signUp';
import { SignUpState } from 'models/signUp';

export const SignUpReducer: Reducer<SignUpState> = (state: SignUpState | undefined, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionTypes.SIGNUP_STARTED: { return reducer.signUpStarted(state!); }
    case ActionTypes.SIGNUP_FAILED: { return reducer.signUpFailed(state!); }
  }
  return state || new SignUpState();
};
