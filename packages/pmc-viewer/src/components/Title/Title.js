import { withBemClass } from '@canvas-panel/core';

import React, { Component } from 'react';
import './Title.scss';

class Title extends Component {
  render() {
    const { bem, children } = this.props;
    return <div className={bem}>{children}</div>;
  }
}

export default withBemClass('pmc-title')(Title);
