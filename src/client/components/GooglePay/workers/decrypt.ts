import { AppThunkAction } from 'store';
import { KnownAction, ActionTypes, DecryptSucceeded } from '../actions';
import * as Api from '../apis';
import { GooglePayState, GooglePayResponse, DecryptResponse } from 'models/googlePay';

export const decryptAction = (googlePayResponse: GooglePayResponse): AppThunkAction<KnownAction> => async (dispatch) => {
  try {
    dispatch({ type: ActionTypes.DECRYPT_STARTED });
    const message: string = (await Api.decrypt<string>(googlePayResponse.paymentMethodToken))!;
    const decryptResponse: DecryptResponse = JSON.parse(message);
    dispatch({ type: ActionTypes.DECRYPT_SUCCEEDED, googlePayResponse, decryptResponse });
  } catch (e) {
    dispatch({ type: ActionTypes.DECRYPT_FAILED });
  }
};

export const decryptStarted = (state: GooglePayState) => state
  .set('isLoading', true)
  .set('googlePayResponse', undefined)
  .set('decryptResponse', undefined);

export const decryptSucceed = (state: GooglePayState, action: DecryptSucceeded) => state
  .set('isLoading', false)
  .set('googlePayResponse', action.googlePayResponse ? new GooglePayResponse(action.googlePayResponse) : undefined)
  .set('decryptResponse', action.decryptResponse ? new DecryptResponse(action.decryptResponse) : undefined);

export const decryptFailed = (state: GooglePayState) => state
  .set('isLoading', false);
