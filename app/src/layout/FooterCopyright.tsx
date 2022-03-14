import React from 'react';
import { APP_DISPLAY_NAME, APP_URL } from '../config/general-config';

interface FooterCopyrightProps {}

const FooterCopyright: React.SFC<FooterCopyrightProps> = () => (
  <p className="ma0 tc">
    <small>
      Copyright © {new Date().getFullYear()}{' '}
      <a href={APP_URL} target="_blank" rel="noopener noreferrer">
        {APP_DISPLAY_NAME}
      </a>
      . All rights reserved.
    </small>
  </p>
);

export default FooterCopyright;
