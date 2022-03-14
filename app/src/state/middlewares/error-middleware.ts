import isPromise from 'is-promise';
import { AnyAction, Dispatch, Middleware } from 'redux';

export const errorMiddleware: Middleware = () => (next: Dispatch) => (
  action: AnyAction
) => {
  if (!isPromise(action.payload)) {
    return next(action);
  }

  return next(action).catch((error: Error) => {
    return error;
  });
};
