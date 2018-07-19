import { signUpAction } from './workers/signUp';

export enum ActionTypes {
  SIGNUP_STARTED = 'SIGNUP_STARTED',
  SIGNUP_FAILED = 'SIGNUP_FAILED',
}

export interface SignUpStarted {
  type: ActionTypes.SIGNUP_STARTED
}

export interface SignUpFailed {
  type: ActionTypes.SIGNUP_FAILED
}

export type KnownAction = SignUpStarted | SignUpFailed;

export const signUpActions = {
  signUpAction
};
