module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: false,
  },
  babel: {
    env: {
      targets: {
        browsers: ['last 2 versions', 'ie >= 10'],
      },
      modules: false,
    },
  },
};
