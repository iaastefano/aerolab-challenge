import AuthService from  '../../services/AuthService';
import { LOGIN, LOGOUT, UNAUTHORIZED } from './constants';
import { IActionLogin, IActionLogout, IActionUnauthorized } from './types';

export const login = (
  email: string,
  password: string,
  token: string,
  callback: () => void
): IActionLogin => ({
  type: LOGIN,
  payload: AuthService.login(email, password, token, callback),
});

export const logout = (callback?: () => void): IActionLogout => {
  AuthService.logout();
  if (callback) {
    callback();
  }
  return { type: LOGOUT };
};

export const unauthorized = (
  response: Response,
  callback?: () => void
): IActionUnauthorized => {
  if (callback) {
    callback();
  }
  return { type: UNAUTHORIZED, payload: response };
};
