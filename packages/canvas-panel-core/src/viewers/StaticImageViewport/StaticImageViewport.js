import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import * as Manifesto from 'manifesto.js';

class StaticImageViewport extends Component {
  state = { dragging: false };

  static propTypes = {
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    draggable: PropTypes.bool,
    onClick: PropTypes.func,
    canvas: PropTypes.any,
  };

  static defaultProps = {
    maxHeight: 0,
    maxWidth: 0,
  };

  componentWillMount() {
    const ratio = this.getRatio();

    if (this.props.getPosition) {
      this.props.getPosition({
        x: 0,
        y: 0,
        zoom: 1 / ratio,
        scale: 1,
        rotation: 0,
      });
    }
  }

  getRatio() {
    const { height, width, maxHeight, maxWidth } = this.props;
    const heightRatio = height / (maxHeight || 500);
    const widthRatio = width / (maxWidth || maxHeight || 500);
    const ratio = heightRatio > widthRatio ? heightRatio : widthRatio;

    if (Number.isNaN(ratio)) {
      return 1;
    }
  }

  getTargetWidth(ratio) {
    const { width } = this.props;
    const targetWidth = Math.floor(width / ratio);
    if (Number.isNaN(targetWidth)) {
      return 0;
    }
    return targetWidth;
  }

  onDrag = ratio => (e, data) => {
    if (this.props.getPosition) {
      this.props.getPosition({
        x: data.x,
        y: data.y,
        zoom: 1 / ratio,
        scale: 1,
        rotation: 0,
      });
    }
  };

  render() {
    const {
      canvas,
      className,
      children,
      width,
      draggable,
      onClick,
      style,
    } = this.props;
    const ratio = this.getRatio();
    const targetWidth = this.getTargetWidth(ratio);
    const pixelRatio = window.devicePixelRatio || 1;

    const body = (
      <div className={className} onClick={onClick}>
        <img
          src={canvas.getCanonicalImageUri(
            Math.floor(targetWidth * pixelRatio)
          )}
          style={{
            width: targetWidth ? targetWidth : 'auto',
            pointerEvents: 'none',
            maxWidth: '100%',
            ...style,
          }}
        />
        {children}
      </div>
    );

    if (draggable) {
      return <Draggable onDrag={this.onDrag(ratio)}>{body}</Draggable>;
    }

    return body;
  }
}

export default StaticImageViewport;
