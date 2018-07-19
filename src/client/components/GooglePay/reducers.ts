import { Action, Reducer } from 'redux';
import { KnownAction, ActionTypes } from './actions';
import * as reducer from './workers/decrypt';
import { GooglePayState } from 'models/googlePay';

export const GooglePayReducer: Reducer<GooglePayState> = (state: GooglePayState | undefined, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionTypes.DECRYPT_STARTED: { return reducer.decryptStarted(state!); }
    case ActionTypes.DECRYPT_SUCCEEDED: { return reducer.decryptSucceed(state!, action); }
    case ActionTypes.DECRYPT_FAILED: { return reducer.decryptFailed(state!); }
  }
  return state || new GooglePayState();
};
