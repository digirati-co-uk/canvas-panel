import './index.css';

import '@canvas-panel/core/lib/polyfill';
import React from 'react';
import { render } from 'react-dom';

import App from './App';

render(<App />, document.querySelector('#app'));
