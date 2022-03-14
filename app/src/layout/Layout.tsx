import { Layout as AntLayout } from 'antd';
import React from 'react';
import Content from './Content';
import SideMenu from './SideMenu';
import HeaderMenu from './HeaderMenu';
import Footer from './Footer';

interface LayoutProps {}

const Layout: React.SFC<LayoutProps> = props => (
  <AntLayout hasSider style={{ minHeight: '100vh' }}>
    <SideMenu />
    <AntLayout>
      <HeaderMenu />
      <Content>{props.children}</Content>
      <Footer />
    </AntLayout>
  </AntLayout>
);

export default Layout;
