import { AppThunkAction } from 'store';
import { KnownAction, ActionTypes } from '../actions';
import * as Api from '../apis';
import { SignUpState, ISignUpRequest } from 'models/signUp';

export const signUpAction = (request: ISignUpRequest): AppThunkAction<KnownAction> => async (dispatch, getState) => {
  try {
    dispatch({ type: ActionTypes.SIGNUP_STARTED });
    const url = await Api.signUp<string>(request);
    if (url) {
      location.replace(url);
    } else {
      throw 'Url is empty';
    }
  } catch (e) {
    dispatch({ type: ActionTypes.SIGNUP_FAILED });
  }
};

export const signUpStarted = (state: SignUpState) => state.set('isLoading', true);

export const signUpFailed = (state: SignUpState) => state.set('isLoading', false);
