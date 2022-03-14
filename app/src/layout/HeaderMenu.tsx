import { Avatar, Dropdown, Icon, Layout, Menu } from 'antd';
import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import ClientResourcesEnum from '../config/client';
import { connect } from 'react-redux';
import { IGlobalState } from '../state';
import { APP_DISPLAY_NAME } from '../config/general-config';
import { getAuthProfile, IProfile } from '../state/auth';

interface HeaderMenuProps {
  profile?: IProfile;
}

const HeaderMenu: React.SFC<HeaderMenuProps & RouteComponentProps> = ({
  profile,
}) => {
  return (
    <Layout.Header>
      <div className="f3 tl absolute white">{APP_DISPLAY_NAME}</div>
      <div className="tr">
        <Dropdown
          className="dib"
        >
          <span>
            <Avatar
              size="small"
              src="/../assets/img/avatar-default.jpg"
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
