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
    canvas: PropTypes.instanceOf(Manifesto.Canvas),
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
    return heightRatio > widthRatio ? heightRatio : widthRatio;
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
    const { canvas, width } = this.props;
    const ratio = this.getRatio();
    const targetWidth = Math.floor(width / ratio);
    const pixelRatio = window.devicePixelRatio || 1;

    return (
      <Draggable onDrag={this.onDrag(ratio)}>
        <div>
          <img
            src={canvas.getCanonicalImageUri(
              Math.floor(targetWidth * pixelRatio)
            )}
            style={{ width: width / ratio, pointerEvents: 'none' }}
          />
        </div>
      </Draggable>
    );
  }
}

export default StaticImageViewport;
