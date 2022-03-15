import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoggedInRoute from '../components/LoggedInRoute/LoggedInRoute';
import PublicRoute from '../components/PublicRoute/PublicRoute';
import ClientResourcesEnum from '../config/client';
import NotFound from '../pages/NotFound/NotFound';
import LoginPage from '../pages/Login/LoginPage';
import HomePage from '../pages/Home/HomePage';
import Logout from '../pages/Logout/Logout';


interface RoutesProps {}

const Routes: React.FunctionComponent<RoutesProps> = () => (
  <BrowserRouter>
    <Switch>

      <PublicRoute
        renderErrorMessage={false}
        exact
        path={ClientResourcesEnum.LOGIN}
        component={LoginPage}
      />
      <Route path={ClientResourcesEnum.LOGOUT} component={Logout} />

      <LoggedInRoute path={ClientResourcesEnum.ROOT} component={HomePage} />

      <Route component={NotFound} />


    </Switch>
  </BrowserRouter>
);

export default Routes;
