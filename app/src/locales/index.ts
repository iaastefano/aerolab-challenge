import Enlang from './en-US';
import Eslang from './es-ES';
import { addLocaleData } from 'react-intl';

addLocaleData(Enlang.data);
addLocaleData(Eslang.data);

const AppLocale = {
  en: Enlang,
  es: Eslang,
};

export default AppLocale;
