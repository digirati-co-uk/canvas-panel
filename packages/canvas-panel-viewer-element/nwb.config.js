module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    umd: {
      global: 'CanvasPanel$$ViewerElement',
    },
  },
  webpack: {
    html: {
      template: 'demo/src/index.html',
    },
  },
};
