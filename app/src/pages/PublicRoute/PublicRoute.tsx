import React from 'react';
import {
  Route,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import { IGlobalState } from '../../state';
import { getAuthIsLoggedIn } from '../../state/auth';
import { connect } from 'react-redux';
import ClientResourcesEnum from '../../config/client';
import { message } from 'antd';
import Translations from '../../locales/translations';

interface PublicRouteProps {
  renderErrorMessage?: boolean;
  isLoggedIn: boolean;
  path: string;
  exact: boolean;
  component: React.ComponentClass<any> | React.StatelessComponent<any>;
}

const PublicRoute: React.SFC<PublicRouteProps & RouteComponentProps> = ({
  isLoggedIn,
  component,
  renderErrorMessage = true,
  path,
}) => {
  if (!isLoggedIn || location.pathname.includes(ClientResourcesEnum.LOGIN)) {
    return <Route component={component} path={path} />;
  }

  if (renderErrorMessage) {
    message.error(Translations.TEXT_MUST_LOGOUT);
  }

  return <Redirect to={ClientResourcesEnum.ROOT} />;
};

const mapStateToProps = (state: IGlobalState) => ({
  isLoggedIn: getAuthIsLoggedIn(state),
});

export default withRouter(connect(mapStateToProps)(PublicRoute));
