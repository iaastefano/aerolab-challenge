import { TOGGLE_COLLAPSE } from './constants';

export interface IAppState {
  isLoading: boolean;
  isSideMenuCollapsed: boolean;
}

// Actions
export interface IActionToggleCollapse {
  type: typeof TOGGLE_COLLAPSE;
}

export type IActionsApp = IActionToggleCollapse;
