import { IAuthState, IActionsAuth, IProfile } from './types';
import {
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  LOGOUT,
} from './constants';
import {
  API_TOKEN,
  LOCAL_STORAGE_JWT_NAME,
  LOCAL_STORAGE_PROFILE,
} from '../../config/general-config';

const getProfile = () => {
  const jsonProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE);
  if (jsonProfile) {
    const profileParsed = JSON.parse(jsonProfile) as IProfile;
    return profileParsed;
  }
};

//TODO: Improve code to avoid side effects on Reducer
const getToken = () => {
  if (!localStorage.getItem(LOCAL_STORAGE_PROFILE)) {
    localStorage.removeItem(LOCAL_STORAGE_JWT_NAME);
    return undefined;
  }

  const token = localStorage.getItem(LOCAL_STORAGE_JWT_NAME);
  if (!token) {
    return undefined;
  }
  return token;
};

const initialState: IAuthState = {
  jwt: getToken(),
  profile: getProfile(),
  isLoggingIn: false,
  error: undefined,
};

export const authReducer = (
  state: IAuthState = initialState,
  action: IActionsAuth
): IAuthState => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, isLoggingIn: true };
    case LOGIN_FULFILLED:
      return {
        ...state,
        isLoggingIn: false,
        jwt: API_TOKEN,
        profile: {
          name: action.payload.name,
          createDate: action.payload.createDate,
          points: action.payload.points,
          id: action.payload.id,
          redeemHistory: action.payload.redeemHistory
        },
        error: undefined,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        jwt: undefined,
        isLoggingIn: false,
        error: action.payload,
      };
    case LOGOUT:
      return { ...state, isLoggingIn: false, jwt: undefined, error: undefined };
    default:
      return state;
  }
};
