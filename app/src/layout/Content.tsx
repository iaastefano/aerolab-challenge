import React from 'react';
import { Layout } from 'antd';

interface ContentProps {}

const Content: React.SFC<ContentProps> = props => {
  return <Layout.Content className="ma3">{props.children}</Layout.Content>;
};

export default Content;
