import React, { Dispatch } from 'react';
import { message } from 'antd';
import ClientResourcesEnum from '../../config/client';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { IGlobalState } from '../../state';
import { logout } from '../../state/auth/actions';
import { IActionLogout } from '../../state/auth/types';
import Translations from '../../locales/translations';
import { Cookies } from 'react-cookie';

interface LogoutProps {
  isLoggedIn: boolean;
  onLogout: (callback: () => void) => void;
}

class Logout extends React.Component<LogoutProps> {
  cookies = new Cookies();

  componentWillMount() {
    const { onLogout } = this.props;
    const allCookies: any[] = this.cookies.getAll();

    Object.entries(allCookies).map(([k, v]) => {
      document.cookie = k + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });

    onLogout(() => {
      message.info(Translations.logout());
    });
  }

  public render() {
    const { isLoggedIn } = this.props;
    return !isLoggedIn && <Redirect to={ClientResourcesEnum.LOGIN} />;
  }
}

const mapStateToProps = (state: IGlobalState) => {
  return {
    isLoggedIn: !!state.auth.jwt,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<IActionLogout>) => {
  return {
    onLogout: (callback: () => void) => dispatch(logout(callback)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
