import { forgotPasswordAction } from './workers/forgotPassword';

export enum ActionTypes {
  FORGOT_PASSWORD_STARTED = 'FORGOT_PASSWORD_STARTED',
  FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED',
}

export interface ForgotPasswordStarted {
  type: ActionTypes.FORGOT_PASSWORD_STARTED
}

export interface ForgotPasswordFailed {
  type: ActionTypes.FORGOT_PASSWORD_FAILED
}

export type KnownAction = ForgotPasswordStarted | ForgotPasswordFailed;

export const forgotPasswordActions = {
  forgotPasswordAction
};
