module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'singleCanvasAnnotationDetailViewer',
      externals: {
        openseadragon: 'OpenSeadragon',
        react: 'React',
        'react-dom': 'ReactDOM',
        'manifesto.js': 'Manifesto',
      },
    },
  },
  babel: {
    runtime: false,
    loose: false,
  },
  webpack: {
    extra: {
      node: { Buffer: false }, // You need to comment this out if you want to build Manifesto.
    },
  },
};
