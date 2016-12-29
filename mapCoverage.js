var lcovSourcemap = require('lcov-sourcemap');

lcovSourcemap.writeLcov('./coverage/coverage.lcov', {
  'index': './dist/index.js.map',
  'index.test': './dist/index.test.js.map'
}, './src', './coverage/coverage.lcov').then(function () {
  console.log('done');
});
