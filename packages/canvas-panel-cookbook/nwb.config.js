module.exports = {
  type: 'react-app',
  webpack: {
    extra: {
      module: {
        rules: [
          { test: /\.md$/, loader: 'html-loader!markdown-loader?gfm=true' },
        ],
      },
    },
  },
  babel: {
    env: {
      targets: {
        browsers: ['last 2 versions', 'ie 10', 'ie 11'],
      },
    },
  },
};
