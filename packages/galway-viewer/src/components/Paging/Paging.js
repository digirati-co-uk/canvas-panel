import React, { Component } from 'react';
import { withBemClass, LocaleString } from '@canvas-panel/core';
import './Paging.scss';

class Paging extends Component {
  render() {
    const { bem, canvas } = this.props;
    return (
      <div className={`${bem} mdc-typography`}>
        <LocaleString>{canvas.getLabel()}</LocaleString>
      </div>
    );
  }
}

export default withBemClass('paging')(Paging);
