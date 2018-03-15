import React, { Component } from 'react';
import SizedViewport from '../SizedViewport/SizedViewport';

class FullPageViewport extends Component {
  static defaultProps = {
    style: {},
    interactive: false,
    position: 'fixed',
  };

  render() {
    const {
      children,
      style,
      zIndex,
      interactive,
      position,
      ...props
    } = this.props;
    const computedStyle = Object.assign(
      {
        position: position === 'fixed' ? 'fixed' : 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: zIndex || 10,
      },
      style
    );

    if (interactive === false) {
      computedStyle.pointerEvents = 'none';
    }

    return (
      <SizedViewport style={computedStyle} {...props}>
        {children}
      </SizedViewport>
    );
  }
}

export default FullPageViewport;
