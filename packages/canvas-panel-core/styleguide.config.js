var path = require('path');
var createNwbWebpackConfig = require('create-nwb-webpack-config');
var wpCgf = createNwbWebpackConfig();
delete wpCgf.optimization;
module.exports = {
  webpackConfig: wpCgf,
  previewDelay: 1000,
  context: {
    manifests: path.resolve(__dirname, 'config/manifests.js'),
  },
  require: [
    'whatwg-fetch',
    'core-js/fn/map',
    'core-js/fn/set',
    'core-js/fn/number/is-integer',
    'core-js/fn/string/ends-with',
  ],
  components: 'src/[components|manifesto|viewers]/[A-Z]*.js',
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Manifesto Components',
      content: 'docs/manifesto.md',
      components: 'src/manifesto/**/*.js',
    },
    {
      name: 'Viewers',
      content: 'docs/viewers.md',
      components: 'src/viewers/**/*.js',
    },
    {
      name: 'UI Components',
      content: 'docs/components.md',
      components: 'src/components/**/*.js',
    },
  ],
};
