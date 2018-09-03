import React, { Component } from 'react';

export default class QueryStringProvider extends Component {
  constructor(props) {
    super(props);
    this.onHashChange = this.onHashChange.bind(this);
    this.onHashChange(this);
    window.addEventListener(
      'hashchange',
      (ev => {
        this.onHashChange();
        this.forceUpdate();
      }).bind(this),
      false
    );
  }

  onHashChange() {
    const hashString = window.location.hash.split(/\?/)[1] || '';
    this.urlParams = this.parseQueryString(hashString);
  }

  parseQueryString(queryString) {
    return queryString.split(/\&/).reduce((result, keyValuePair) => {
      let [rawKey, rawValue] = keyValuePair.split('=', 2);
      if (rawKey) {
        result[decodeURIComponent(rawKey)] = decodeURIComponent(rawValue || '');
      }
      return result;
    }, {});
  }
}
