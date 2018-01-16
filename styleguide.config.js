var createNwbWebpackConfig = require('create-nwb-webpack-config');

module.exports = {
  webpackConfig: createNwbWebpackConfig(),
  components: 'src/**/[A-Z]*.js',
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
