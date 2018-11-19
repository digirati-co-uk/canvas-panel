module.exports = require('babel-jest').createTransformer({
  presets: [
    [
      'env',
      {
        targets: {
          node: '8.11.0',
        },
        useBuiltIns: true,
      },
    ],
    'react',
    'flow',
  ],
  plugins: [
    [
      'transform-runtime',
      {
        helpers: false,
        polyfill: false,
        regenerator: true,
      },
    ],
  ],
});
