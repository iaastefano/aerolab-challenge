import * as React from 'react';
import {
  Redirect,
  Route,
  RouteProps,
  withRouter,
  RouteComponentProps,
  Prompt,
} from 'react-router-dom';
import ClientResourcesEnum from '../../config/client';
import { connect } from 'react-redux';
import { getAuthIsLoggedIn } from '../../state/auth';
import { IGlobalState } from '../../state';
import Translations from '../../locales/translations';

interface LoggedInRouteProps {
  path: string;
  exact?: boolean;
  isLoggedIn: boolean;
  component:
    | React.ComponentClass<RouteProps>
    | React.StatelessComponent<RouteProps>;
}

class LoggedInRoute extends React.Component<
  LoggedInRouteProps & RouteComponentProps
> {
  public render() {
    const {
      path,
      exact = false,
      component: Component,
      isLoggedIn,
    } = this.props;
    if (!isLoggedIn) {
      return (
        <Redirect
          to={{
            pathname: ClientResourcesEnum.LOGIN,
            search:
              location.pathname !== ClientResourcesEnum.ROOT
                ? `?from=${location.pathname}`
                : '',
          }}
        />
      );
    }

    return (
      <Route
        path={path}
        exact={exact}
        render={route => <Component {...route} />}
      />
    );
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  isLoggedIn: getAuthIsLoggedIn(state),
});

export default withRouter(connect(mapStateToProps)(LoggedInRoute));
