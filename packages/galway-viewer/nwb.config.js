const sassDefine = require('sass-define');

module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: '',
    rules: {
      sass: {
        data: sassDefine(require('./sassConfig')),
      },
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
