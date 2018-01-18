var path = require('path');
var createNwbWebpackConfig = require('create-nwb-webpack-config');

module.exports = {
  webpackConfig: createNwbWebpackConfig(),
  previewDelay: 1000,
  context: {
    manifests: path.resolve(__dirname, 'config/manifests.js'),
  },
  components: 'src/[components|manifesto|viewers]/[A-Z]*.js',
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'Manifesto Components',
      content: 'docs/manifesto.md',
      components: 'src/manifesto/**/*.js'
    },
    {
      name: 'Viewers',
      content: 'docs/viewers.md',
      components: 'src/viewers/**/*.js'
    },
    {
      name: 'UI Components',
      content: 'docs/components.md',
      components: 'src/components/**/*.js'
    }
  ]
};
