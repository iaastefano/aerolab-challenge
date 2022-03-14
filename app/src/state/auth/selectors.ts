import { IGlobalState } from '..';
import { IProfile } from '.';

export const getAuthIsLoggingIn = (state: IGlobalState): boolean =>
  state.auth.isLoggingIn;

export const getAuthIsLoggedIn = (state: IGlobalState): boolean =>
  !!state.auth.jwt;

export const getAuthProfile = (state: IGlobalState): IProfile | undefined =>
  state.auth.profile;

export const getAuthToken = (state: IGlobalState): string | undefined =>
  state.auth.jwt;
