import { FULFILLED, PENDING, REJECTED } from 'redux-promise-middleware';
import { IActionsApp, IAppState } from './types';
import { TOGGLE_COLLAPSE } from './constants';

const initialState: IAppState = {
  isLoading: false,
  isSideMenuCollapsed: false,
};

export const appReducer = (
  state: IAppState = initialState,
  action: IActionsApp
): IAppState => {
  if (action.type.endsWith(PENDING)) {
    return { ...state, isLoading: true };
  }

  if (action.type.endsWith(FULFILLED)) {
    return { ...state, isLoading: false };
  }

  if (action.type.endsWith(REJECTED)) {
    return { ...state, isLoading: false };
  }

  switch (action.type) {
    case TOGGLE_COLLAPSE:
      return { ...state, isSideMenuCollapsed: !state.isSideMenuCollapsed };
    default:
      return state;
  }
};
