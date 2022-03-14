import { LocaleProvider } from 'antd';
import React from 'react';
import { IntlProvider } from 'react-intl';
import AppLocale from '../locales';
import { Provider } from 'react-redux';
import Routes from './Routes';
import store from '../state';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const appLocale = AppLocale.en;

interface AppProps {}

const App: React.FunctionComponent<AppProps> = () => {
  return (
    <Provider store={store}>
      <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
          <Routes />
        </IntlProvider>
      </LocaleProvider>
    </Provider>
  );
};

export default App;
