import { initialAction } from './workers/initial';
import { InitialState } from 'models/initial';

export enum ActionTypes {
  INITIAL_SUCCEEDED = 'INITIAL_SUCCEEDED',
  INITIAL_FAILED = 'INITIAL_FAILED',
}

export interface InitialSucceeded {
  type: ActionTypes.INITIAL_SUCCEEDED,
  data: InitialState
}

export interface InitialFailed {
  type: ActionTypes.INITIAL_FAILED
}

export type KnownAction = InitialSucceeded | InitialFailed;

export const initialActions = {
  initialAction
};
