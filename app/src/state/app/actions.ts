import { TOGGLE_COLLAPSE } from './constants';
import { IActionToggleCollapse } from './types';

export const toggleCollapse = (): IActionToggleCollapse => ({
  type: TOGGLE_COLLAPSE,
});
