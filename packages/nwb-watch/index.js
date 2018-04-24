const getPluginConfig = require('nwb/lib/config/plugin').getPluginConfig;
const getUserConfig = require('nwb/lib/config/user').getUserConfig;
const path = require('path');
const createBabelConfig = require('nwb/lib/createBabelConfig');
const createBuildConfig = require('nwb/lib/appCommands').createBuildConfig;
const nwbConfig = require(path.join(process.cwd(), 'nwb.config.js'));
const fs = require('fs');
const spawn = require('cross-spawn');

const args = { _: ['build-' + nwbConfig.type] };

let pluginConfig = getPluginConfig(args);
let userConfig = getUserConfig(args, { pluginConfig });

const userConfiguration = createBuildConfig(args, args);

const babelBuildConfig =
  nwbConfig.type === 'react-component'
    ? {
        presets: [require.resolve('babel-preset-react')],
        stage: 1,
        removePropTypes: {
          mode: 'wrap',
        },
      }
    : {
        setRuntimePath: false,
        webpack: false,
      };

const DEFAULT_BABEL_IGNORE_CONFIG = [
  '.spec.js',
  '.test.js',
  '-test.js',
  '/__tests__/',
];

module.exports = function runBabel({ copyFiles, outDir, src }) {
  const baseConfig = Object.assign(nwbConfig.babel || {}, { webpack: false });
  let babelConfig = createBabelConfig(
    babelBuildConfig,
    userConfig.babel,
    userConfig.path
  );

  babelConfig.ignore = DEFAULT_BABEL_IGNORE_CONFIG;

  let babelArgs = [
    src,
    '--out-dir',
    outDir,
    '--quiet',
    '--watch',
    '--source-maps',
  ];
  if (copyFiles) {
    babelArgs.push('--copy-files');
  }

  fs.writeFile('.babelrc', JSON.stringify(babelConfig, null, 2), err => {
    if (err) return;
    let babel = spawn(require.resolve('.bin/babel'), babelArgs, {
      stdio: 'inherit',
    });
    babel.on('exit', code => {
      let babelError;
      if (code !== 0) {
        babelError = new Error('Babel transpilation failed');
      }
      fs.unlink('.babelrc');
    });
  });
};
