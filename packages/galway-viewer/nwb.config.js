module.exports = {
  type: 'react-app',
  webpack: {
    publicPath: '',
  },
  babel: {
    env: {
      targets: {
        browsers: ['last 2 versions', 'ie 9', 'ie 10', 'ie 11'],
      },
    },
  },
};
