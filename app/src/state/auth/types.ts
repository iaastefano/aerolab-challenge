import {
  LOGIN,
  LOGIN_FULFILLED,
  LOGIN_PENDING,
  LOGIN_REJECTED,
  LOGOUT,
  UNAUTHORIZED,
} from './constants';
import { IUser } from '../../no-state/users/models';
import { ILoginResponse } from './models';

export interface IProfile extends IUser {}

export interface IAuthState {
  isLoggingIn: boolean;
  profile?: IProfile;
  jwt?: string;
  error?: Error;
}
// Actions
export interface IActionLogin {
  type: typeof LOGIN;
  payload: Promise<ILoginResponse>;
}

export interface IActionLoginPending {
  type: typeof LOGIN_PENDING;
}

export interface IActionLoginFulfilled {
  type: typeof LOGIN_FULFILLED;
  payload: ILoginResponse;
}

export interface IActionLoginRejected {
  type: typeof LOGIN_REJECTED;
  payload: Error;
  error: boolean;
}

export interface IActionLogout {
  type: typeof LOGOUT;
}

export interface IActionUnauthorized {
  type: typeof UNAUTHORIZED;
  payload: Response;
}

export type IActionsAuth =
  | IActionLogin
  | IActionLoginPending
  | IActionLoginFulfilled
  | IActionLoginRejected
  | IActionLogout;
