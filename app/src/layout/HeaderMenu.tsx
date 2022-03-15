import { Avatar, Dropdown, Icon, Layout, Menu } from 'antd';
import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import ClientResourcesEnum from '../config/client';
import { connect } from 'react-redux';
import { IGlobalState } from '../state';
import { APP_DISPLAY_NAME } from '../config/general-config';
import { getAuthProfile, IProfile } from '../state/auth';
import logo from "../assets/aerolab-logo-1.svg";
import avatar from "../assets/avatar-default.png";

interface HeaderMenuProps {
  profile?: IProfile;
}

const HeaderMenu: React.SFC<HeaderMenuProps & RouteComponentProps> = ({
  profile,
}) => {
  return (
    <Layout.Header>
      <div className='f3 tl absolute white'>
        <Link to={ClientResourcesEnum.ROOT}>
          <img
            src={logo}
            alt="Aerolab Shop"
            className="pa2 db"
            style={{ maxHeight: '5em', margin: '0 auto' }}
            />
        </Link>
      </div>
      <div className="tr">
        <Dropdown
          className="dib"
          overlay={
            <Menu>
              <Menu.Item key={ClientResourcesEnum.LOGOUT}>
                <Link to={ClientResourcesEnum.LOGOUT}>
                  <Icon type="logout" className="mr1" />
                  <span>Logout</span>
                </Link>
              </Menu.Item>
            </Menu>
          }
        >
          <span className='pointer'>
            <Avatar
              size="default"
              src={avatar}
              className="mr1"
            />
            <span style={{ color: '#fff' }}>
              {profile && `${profile.name}`}
            </span>
          </span>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

const mapStateToProps = (state: IGlobalState) => ({
  user: getAuthProfile(state),
});

export default withRouter(connect(mapStateToProps)(HeaderMenu));
