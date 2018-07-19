import { AppThunkAction } from 'store';
import { KnownAction, ActionTypes } from '../actions';
import * as Api from '../apis';
import { ForgotPasswordState, IForgotPasswordRequest } from 'models/forgotPassword';

export const forgotPasswordAction = (request: IForgotPasswordRequest): AppThunkAction<KnownAction> => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.FORGOT_PASSWORD_STARTED });
    const url = await Api.forgotPassword<string>(request);
    if (url) {
      location.replace(url);
    } else {
      throw 'Url is empty';
    }
  } catch (e) {
    dispatch({ type: ActionTypes.FORGOT_PASSWORD_FAILED });
  }
};

export const forgotPasswordStarted = (state: ForgotPasswordState) => state.set('isLoading', true);

export const forgotPasswordFailed = (state: ForgotPasswordState) => state.set('isLoading', false);
