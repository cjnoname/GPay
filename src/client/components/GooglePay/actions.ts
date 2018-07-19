import { decryptAction } from './workers/decrypt';
import { GooglePayResponse, DecryptResponse } from 'models/googlePay';

export enum ActionTypes {
  DECRYPT_STARTED = 'DECRYPT_STARTED',
  DECRYPT_SUCCEEDED = 'DECRYPT_SUCCEEDED',
  DECRYPT_FAILED = 'DECRYPT_FAILED',
}

export interface DecryptStarted {
  type: ActionTypes.DECRYPT_STARTED
}

export interface DecryptSucceeded {
  type: ActionTypes.DECRYPT_SUCCEEDED,
  googlePayResponse: GooglePayResponse,
  decryptResponse: DecryptResponse
}

export interface DecryptFailed {
  type: ActionTypes.DECRYPT_FAILED
}

export type KnownAction = DecryptStarted | DecryptSucceeded | DecryptFailed;

export const decryptActions = {
  decryptAction
};
