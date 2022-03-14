import React from 'react';
import Translations from '../../locales/translations';
import Layout from '../../layout/Layout';
import Home from '../../components/Home/Home';

interface HomeProps {}

const HomePage: React.FunctionComponent<HomeProps> = () => {
  return (
    <Layout>
      <Home/>
    </Layout>
  );
};

export default HomePage;
