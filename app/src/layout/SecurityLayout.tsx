import React from 'react';
import { Layout, Row, Col, Card } from 'antd';
import background from '../assets/background-login.png';

interface SecurityLayoutProps {
  title: string;
}

const SecurityLayout: React.SFC<SecurityLayoutProps> = props => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ display: 'flex' }}>
        <Row type="flex" style={{ flex: 1 }}>
          <Col sm={16} style={{ display: 'flex' }}>
            <div
              style={{
                flex: 1,
                backgroundColor: '#eee',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundImage: `url(${background})`
              }}
            />
          </Col>

          <Col sm={8} style={{ display: 'flex', flex: 1 }}>
            <Card
              title={props.title}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
              bodyStyle={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ flex: 1 }}>{props.children}</div>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default SecurityLayout;
