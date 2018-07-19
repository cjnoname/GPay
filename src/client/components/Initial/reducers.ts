import { Action, Reducer } from 'redux';
import { KnownAction, ActionTypes } from './actions';
import * as initial from './workers/initial';
import { InitialState } from 'models/initial';

export const InitialReducer: Reducer<InitialState> = (state: InitialState | undefined, incomingAction: Action) => {
  const action = incomingAction as KnownAction;
  switch (action.type) {
    case ActionTypes.INITIAL_SUCCEEDED: { return initial.initialSucceeded(action); }
    case ActionTypes.INITIAL_FAILED: { return initial.initialFailed(state!); }
  }
  return state || new InitialState();
};
