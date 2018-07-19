import { AppThunkAction } from 'store';
import { KnownAction, ActionTypes, InitialSucceeded } from '../actions';
import * as Api from '../apis';
import { InitialState } from 'models/initial';

export const initialAction = (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
  try {
    const data = await Api.getInitialValues<InitialState>();
    if (data) {
      dispatch({ type: ActionTypes.INITIAL_SUCCEEDED, data });
    }
  } catch (e) {
    dispatch({ type: ActionTypes.INITIAL_FAILED });
  }
};

export const initialSucceeded = (action: InitialSucceeded) => {
  return new InitialState(action.data).set('isLoading', false);
};

export const initialFailed = (state: InitialState) => state.set('isLoading', false);
