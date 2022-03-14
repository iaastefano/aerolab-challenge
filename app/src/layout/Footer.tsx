import React from 'react';
import { Layout } from 'antd';
import FooterCopyright from './FooterCopyright';

interface FooterProps {}

const Footer: React.SFC<FooterProps> = () => (
  <Layout.Footer>
    <FooterCopyright />
  </Layout.Footer>
);

export default Footer;
