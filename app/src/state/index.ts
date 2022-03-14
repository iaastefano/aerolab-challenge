import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import { appReducer } from './app/reducer';
import { IAppState } from './app/types';
import { IAuthState, LOGOUT } from './auth';
import { errorMiddleware, unauthorizedMiddleware } from './middlewares';
import { authReducer } from './auth/reducer';

export type IGlobalState = {
  app: IAppState;
  auth: IAuthState;
};

const reducers = combineReducers<IGlobalState>({
  app: appReducer,
  auth: authReducer,
});

const rootReducer = (
  state: IGlobalState | undefined,
  action: AnyAction
): IGlobalState => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return reducers(state, action);
};

const store = createStore(
  rootReducer,
  applyMiddleware(
    createLogger(),
    unauthorizedMiddleware,
    errorMiddleware,
    promiseMiddleware()
  )
);

export default store;
