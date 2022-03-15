import { sample } from 'lodash';

const SUCCESS_MESSAGES = ['Action done successfully!', 'Perfect!', 'Ok!'];

const LOGOUT_MESSAGES = ['See you later!', 'See you soon!', 'Bye bye!'];

const Translations: any = {
  success: () => sample(SUCCESS_MESSAGES),
  logout: () => sample(LOGOUT_MESSAGES),
  TEXT_YES: 'Yes',
  TEXT_NO: 'No',
  TEXT_PASSWORD: 'Password',
  TEXT_CONFIRM_PASSWORD: 'Confirm Password',
  TEXT_USERNAME: 'Username',
  TEXT_EMAIL: 'Email',
  TEXT_CONTACTS: 'Contacts',
  TEXT_LOGIN: 'Log in',
};


export default Translations;
