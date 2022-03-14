import React from 'react';
import { Layout, Button } from 'antd';
import {
  Link,
  withRouter,
  RouteComponentProps,
  Redirect,
} from 'react-router-dom';
import ClientResourcesEnum from '../../config/client';
import { connect } from 'react-redux';
import { IGlobalState } from '../../state';
import { getAuthIsLoggedIn } from '../../state/auth';

interface NotFoundProps {
  isLoggedIn: boolean;
}

const NotFound: React.SFC<NotFoundProps & RouteComponentProps> = ({
  history,
  match,
  isLoggedIn,
  location,
}) => {
  return !isLoggedIn ? (
    <Redirect
      to={{
        pathname: ClientResourcesEnum.LOGIN,
        search: `?from=${location.pathname}`,
      }}
    />
  ) : (
    <Layout style={{ minHeight: '100vh' }} className="justify-center">
      <div className="tc">
        <span className="db f-headline">404</span>
        <Button
          className="mr3"
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </Button>
        <Link to={ClientResourcesEnum.ROOT}>Go Home</Link>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isLoggedIn: getAuthIsLoggedIn(state),
});

export default withRouter(connect(mapStateToProps)(NotFound));
