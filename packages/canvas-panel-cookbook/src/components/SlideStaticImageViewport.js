import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import * as Manifesto from '@stephenwf-forks/manifesto.js';

class SlideStaticImageViewport extends Component {
  state = {
    dragging: false,
  };

  static propTypes = {
    maxHeight: PropTypes.number,
    maxWidth: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    onClick: PropTypes.func,
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

  getRatio = () => {
    const { height, width, maxHeight, maxWidth } = this.props;
    const heightRatio = height / (maxHeight || 500);
    const widthRatio = width / (maxWidth || maxHeight || 500);
    return heightRatio > widthRatio ? heightRatio : widthRatio;
  };

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

  getEmbededAnnotations(canvas) {
    if (canvas.__jsonld.annotations) {
      let annotations = [];
      canvas.__jsonld.annotations.forEach(item => {
        if (item.type === 'AnnotationPage' && item.hasOwnProperty('items')) {
          item.items.forEach(annotation => {
            if (annotation.type === 'Annotation') {
              annotations.push(annotation);
            }
          });
        } else if (item.type === 'Annotation') {
          annotations.push(item);
        }
      });
      return annotations;
    } else {
      return [];
    }
  }

  render() {
    const { canvas, width, onClick } = this.props;
    const ratio = this.getRatio();
    const targetWidth = Math.floor(width / ratio);
    const pixelRatio = window.devicePixelRatio || 1;
    let isCover = false;
    let imageUri = canvas.getCanonicalImageUri(
      Math.floor(targetWidth * pixelRatio)
    );

    const viewportFocuses = this.getEmbededAnnotations(canvas).filter(
      annotation => annotation.motivation === 'layout-viewport-focus'
    );

    if (viewportFocuses.length > 0) {
      // we only care about the first for now
      let viewportFocus = viewportFocuses[0];
      let imageURIParts = imageUri.split('/');
      let position = viewportFocus.target.split('#')[1];
      imageURIParts[imageURIParts.length - 4] = position;
      let [_left, _top, _width, _height] = position
        .split(',')
        .map(i => parseInt(i, 10));

      imageUri = imageURIParts.join('/');
      isCover = true;
    }

    const body = (
      <div onClick={onClick}>
        <img
          src={imageUri}
          style={{
            width: width / ratio,
            pointerEvents: 'none',
            objectFit: isCover ? 'cover' : 'contain',
          }}
        />
      </div>
    );

    return body;
  }
}

export default SlideStaticImageViewport;
