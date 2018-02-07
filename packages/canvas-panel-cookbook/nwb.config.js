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
};
