import { signInAction } from './workers/signIn';

export enum ActionTypes {
  SIGNIN_STARTED = 'SIGNIN_STARTED',
  SIGNIN_FAILED = 'SIGNIN_FAILED',
}

export interface SignInStarted {
  type: ActionTypes.SIGNIN_STARTED
}

export interface SignInFailed {
  type: ActionTypes.SIGNIN_FAILED
}

export type KnownAction = SignInStarted | SignInFailed;

export const signInActions = {
  signInAction
};
