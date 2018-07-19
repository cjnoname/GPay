import { AppThunkAction } from 'store';
import { KnownAction, ActionTypes } from '../actions';
import * as Api from '../apis';
import { SignInState, ISignInRequest } from 'models/signIn';

export const signInAction = (request: ISignInRequest): AppThunkAction<KnownAction> => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.SIGNIN_STARTED });
    const url = await Api.signIn<string>(request);
    if (url) {
      location.replace(url);
    } else {
      throw 'Url is empty';
    }
  } catch (e) {
    dispatch({ type: ActionTypes.SIGNIN_FAILED });
  }
};

export const signInStarted = (state: SignInState) => state.set('isLoading', true);

export const signInFailed = (state: SignInState) => state.set('isLoading', false);
