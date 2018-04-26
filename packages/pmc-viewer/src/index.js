import React from 'react';
import { render } from 'react-dom';
import './index.css';

import App from './App';

render(
  <App
    manifestUri={
      window.location.hash.substr(1) ||
      'https://wellcomelibrary.org/iiif/b18035723/manifest'
    }
  />,
  document.querySelector('#app')
);
