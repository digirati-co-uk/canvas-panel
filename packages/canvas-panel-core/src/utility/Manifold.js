/**
 * @flow
 */
import '@iiif/manifold';

global.$ = global.$ ? global.$ : {};
global.$.ajax = ({ url, type, dataType, beforeSend }) => {
  const fake = {
    headers: {},
    setRequestHeader(name, value) {
      this.headers[name] = value;
    },
  };
  beforeSend(fake);
  return {
    done(func) {
      const obj = {
        func: e => {
          this.err = e;
        },
        fail(fn) {
          this.func = fn;
        },
      };
      fetch(url)
        .then(k => (dataType === 'json' ? k.json() : k.text()))
        .then(func)
        .catch(e => obj.func(e));

      return obj;
    },
    fail() {},
  };
};
/*
$.ajax({
    url: that.dataUri,
    type: type,
    dataType: 'json',
    beforeSend: function (xhr) {
        if (accessToken) {
            xhr.setRequestHeader("Authorization", "Bearer " + accessToken.accessToken);
        }
    }
})
*/

export default global.Manifold;
