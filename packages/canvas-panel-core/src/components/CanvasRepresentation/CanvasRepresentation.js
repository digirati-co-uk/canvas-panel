import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as Manifesto from '@stephenwf-forks/manifesto.js';

class CanvasRepresentation extends Component {
  static propTypes = {
    // canvas: PropTypes.instanceOf(Manifesto.Canvas),
  };

  static defaultProps = {
    maxWidth: 500,
    ratio: 1,
  };

  processChildStyle(child) {
    const { position, ratio } = this.props;
    const { maxHeight, ...style } = child.props.style;
    const computedMaxHeight = maxHeight ? 'auto' : maxHeight * ratio;

    if (child.props.growthStyle === 'fixed') {
      const zam = position ? position.zoom * (1 / ratio) : 1;
      const fixedMaxHeight = maxHeight && zam ? maxHeight / (1 / zam) : 'auto';
      return {
        ...style,
        position: 'absolute',
        top: child.props.y * ratio,
        left: child.props.x * ratio,
        height: child.props.height * ratio * zam,
        width: child.props.width * ratio * zam,
        maxHeight: fixedMaxHeight,
        transform: 'scale(' + 1 / zam + ')',
        transformOrigin: 'top left',
      };
    }

    if (child.props.growthStyle === 'absolute') {
      // Do opposite of above, make double the size and scale it down.
    }

    return {
      ...style,
      position: 'absolute',
      top: child.props.y * ratio,
      left: child.props.x * ratio,
      height: child.props.height * ratio,
      width: child.props.width * ratio,
      maxHeight: computedMaxHeight,
    };
  }

  render() {
    const {
      canvas,
      style,
      ratio,
      children,
      height,
      width,
      ...props
    } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          height: height * ratio,
          width: width * ratio,
          pointerEvents: 'none',
          ...style,
        }}
      >
        {React.Children.map(children, child => {
          const propsForEl = child.type === 'div' ? {} : { canvas, ...props };
          return React.cloneElement(child, {
            style: this.processChildStyle(child),
            ...propsForEl,
          });
        })}
      </div>
    );
  }
}

export default CanvasRepresentation;
