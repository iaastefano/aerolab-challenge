import { Divider } from 'antd';
import queryString from 'query-string';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../../components/Login/Login';
import ClientResourcesEnum from '../../config/client';
import FooterCopyright from '../../layout/FooterCopyright';
import SecurityLayout from '../../layout/SecurityLayout';
import { IGlobalState } from '../../state';
import { getAuthIsLoggedIn } from '../../state/auth';

interface LoginPageProps {
  isLoggedIn: boolean;
}

type QueryStringProps = {
  from: string;
};

const LoginPage: React.SFC<LoginPageProps> = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    const params = queryString.parse(location.search) as QueryStringProps;
    return <Redirect to={params.from || ClientResourcesEnum.ROOT} />;
  }

  return (
    <SecurityLayout title="Aerolab Shop">
      <Login />
      <Divider />
      <FooterCopyright />
    </SecurityLayout>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  isLoggedIn: getAuthIsLoggedIn(state),
});

export default connect(mapStateToProps)(LoginPage);
