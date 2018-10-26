import React, { Component } from 'react';
import SizedViewport from '../SizedViewport/SizedViewport';

class FullPageViewport extends Component {
  static defaultProps = {
    style: {},
    interactive: false,
    position: 'fixed',
  };

  state = {
    position: {},
  };

  componentDidMount() {
    if (this.props.getContainer) {
      const container = this.props.getContainer();
      try {
        const { top, left, width, height } = container.getBoundingClientRect();
        this.setState({ position: { top, left, width, height } });
      } catch (e) {
        console.warn(e);
      }
    }
  }

  render() {
    const {
      children,
      style,
      zIndex,
      interactive,
      position,
      ...props
    } = this.props;
    const computedStyle = {
      position: position === 'fixed' ? 'fixed' : 'absolute',
      top: this.state.top,
      left: this.state.left,
      zIndex: zIndex || 10,
      ...this.state.position,
      ...style,
    };

    if (position === 'fixed' && !computedStyle.height) {
      computedStyle.bottom = 0;
    }

    if (position === 'fixed' && !computedStyle.width) {
      computedStyle.right = 0;
    }

    if (interactive === false) {
      computedStyle.pointerEvents = 'none';
    }

    if (!computedStyle.width) {
      computedStyle.width = '100%';
    }

    return (
      <SizedViewport style={computedStyle} {...props}>
        {children}
      </SizedViewport>
    );
  }
}

export default FullPageViewport;
