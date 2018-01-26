import React, { PureComponent } from 'react';
import * as Manifesto from 'manifesto.js';
import * as PropTypes from 'prop-types';

class LocaleString extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(Manifesto.Translation)),
  };

  render() {
    if (!this.props.children) {
      return null;
    }
    return Manifesto.TranslationCollection.getValue(this.props.children);
  }
}

export default LocaleString;
