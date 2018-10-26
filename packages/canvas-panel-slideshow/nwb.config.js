module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'slideShowViewer',
      entry: './src/umd.js',
      externals: {
        openseadragon: 'OpenSeadragon',
        react: 'React',
        'react-dom': 'ReactDOM',
        // 'Manifesto': 'Manifesto',
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
