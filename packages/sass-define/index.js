const jsonSass = require('json-sass/lib/jsToSassString');

const sassValues = function(obj) {
  return (
    Object.keys(obj)
      .map(function(key) {
        return '$' + key + ': ' + jsonSass(obj[key]);
      })
      .join(';') + ';'
  );
};

module.exports = sassValues;
