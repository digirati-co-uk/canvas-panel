import './index.css';

import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(
  <App manifestUri="https://gist.githubusercontent.com/stephenwf/8c417a212866a21f48bd3ce9182e2f28/raw/cbfc217bd4c2f9311438a881db9a43fd015481cb/raw.json" />,
  // <App manifestUri="https://edsilv.github.io/test-manifests/range-renderings.json" />,
  document.querySelector('#app')
);
