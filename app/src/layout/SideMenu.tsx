import { Icon, Layout as AntLayout, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import logo from '../assets/logo-white.png';
import ClientResourcesEnum from '../config/client';
import MenuKeysEnum from '../config/menu-keys';
import Translations from '../locales/translations';
import { IGlobalState } from '../state';
import { toggleCollapse } from '../state/app/actions';
import { IActionsApp, IActionToggleCollapse } from '../state/app/types';
import { getAuthProfile, IProfile } from '../state/auth';

export interface MenuItem {
  key: MenuKeysEnum;
  path?: string;
  title: string;
  icon: string;
  resources?: string[];
  submenu?: MenuItem[];
  target?: string;
}

interface SideMenuProps {
  isCollapsed: boolean;
  profile?: IProfile;
  onToggleCollapse: () => IActionToggleCollapse;
}

class SideMenu extends React.Component<SideMenuProps & RouteComponentProps> {
  private menuItems: MenuItem[] = [
    {
      key: MenuKeysEnum.ROOT,
      path: ClientResourcesEnum.ROOT,
      title: Translations.TEXT_DASHBOARD,
      icon: 'appstore',
    },
  ];

  private getSubMenuToExpand = () => {
    const { location } = this.props;

    return this.menuItems
      .filter(item => item.submenu)
      .find(menuItem =>
        menuItem.submenu
          ? menuItem.submenu.some(
              subMenuItem =>
                !!subMenuItem.path && subMenuItem.path === location.pathname
            )
          : false
      );
  };

  private handleMenuItemClick = (e: any) => {
    e.stopPropagation();
  };

  private renderMenuItem = (item: MenuItem) => {
    let element = (
      <>
        <Icon type={item.icon} />
        <span>{item.title}</span>
      </>
    );

    if (item.path && !item.submenu) {
      element = (
        <Link
          to={item.path}
          onClick={this.handleMenuItemClick}
          target={item.target || ''}
        >
          {element}
        </Link>
      );
    }

    return <Menu.Item key={item.path}>{element}</Menu.Item>;
  };

  public render() {
    const { history, location, isCollapsed, onToggleCollapse } = this.props;
    const submenuToExpand = this.getSubMenuToExpand();

    const menu = (
      <AntLayout.Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={onToggleCollapse}
        style={{ height: 'inherit' }}
      >
        <Link to={ClientResourcesEnum.ROOT}>
          <img
            src={logo}
            alt="Aerolab Shop"
            className="pa2 db"
            style={{ maxHeight: '5em', margin: '0 auto' }}
          />
        </Link>
        <Menu
          theme="dark"
          selectedKeys={[`${location.pathname}${location.search}`]}
          mode="inline"
          onClick={(e: ClickParam) => history.push(e.key)}
          defaultOpenKeys={
            (submenuToExpand && [submenuToExpand.key.toString()]) || []
          }
        >
          {this.menuItems
            .map(item =>
              !item.submenu ? (
                this.renderMenuItem(item)
              ) : (
                <Menu.SubMenu
                  key={item.key}
                  title={
                    <>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </>
                  }
                >
                  {item.submenu
                    .map(subItem => this.renderMenuItem(subItem))}
                </Menu.SubMenu>
              )
            )}
        </Menu>
      </AntLayout.Sider>
    );

    return menu;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  isCollapsed: state.app.isSideMenuCollapsed,
  profile: getAuthProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<IActionsApp>) => ({
  onToggleCollapse: (): IActionToggleCollapse => dispatch(toggleCollapse()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideMenu)
);
