require('babel-runtime/regenerator');
require('jest-canvas-mock');
require('./packages/canvas-panel-core/src/polyfill');

global._regeneratorRuntime = regeneratorRuntime;
