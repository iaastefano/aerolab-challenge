import { AnyAction, Dispatch, Middleware } from 'redux';
import { message } from 'antd';
import { logout, UNAUTHORIZED, IActionUnauthorized } from '../auth';
import Translations from '../../locales/translations';
import { ApiResourcesEnum } from '../../config/api';

export const unauthorizedMiddleware: Middleware = ({ dispatch }) => (
  next: Dispatch
) => (action: IActionUnauthorized) => {
  if (action.type === UNAUTHORIZED) {
    const { url } = action.payload;
    const lastSegmentUrl = url.substr(url.lastIndexOf('/'));
    if (lastSegmentUrl !== ApiResourcesEnum.LOGOUT) {
      message.error(Translations.TEXT_UNAUTHORIZED);
      dispatch(logout());
    }
  }

  next(action);
};
