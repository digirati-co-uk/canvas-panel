const sassDefine = require('sass-define');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: {
      global: 'CanvasPanel$$PMCViewerElement',
    },
  },
  webpack: {
    publicPath: '',
    rules: {
      sass: {
        data: sassDefine(require('./sassConfig')),
      },
    },
    html: {
      template: 'demo/src/index.html',
    },
  },
  babel: {
    env: {
      targets: {
        browsers: ['last 2 versions', 'ie 9', 'ie 10', 'ie 11'],
      },
    },
  },
};
