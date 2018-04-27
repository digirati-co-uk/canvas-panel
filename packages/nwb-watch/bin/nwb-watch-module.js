#!/usr/bin/env node
const runBabel = require('../index');
const fs = require('fs');

console.log('Watching for changes');
runBabel({ copyFiles: true, outDir: 'es', src: 'src' });

function cleanUp() {
  console.log('Cleaning up babel rc');
  fs.unlink('.babelrc', unlinkError => {
    console.log('done.');
    if (unlinkError) {
      console.error('unlinkError');
    }
    process.exit();
  });
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
process.on('SIGQUIT', cleanUp);
