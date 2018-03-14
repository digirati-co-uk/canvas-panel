import React, { Component } from 'react';

class Viewport extends Component {
  state = {
    x: 0,
    y: 0,
    zoom: 1,
    scale: 1,
    rotation: 0,
  };

  componentDidMount() {
    if (this.props.setRef) {
      this.props.setRef(this);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.setRef !== newProps.setRef) {
      newProps.setRef(this);
    }
  }

  onUpdateViewport = ({
    x,
    y,
    zoom,
    scale,
    rotation,
    imageRatio,
    isZoomedOut = true,
  }) => {
    this.setState({
      x,
      y,
      zoom,
      scale,
      rotation,
      imageRatio,
      isZoomedOut,
    });

    if (this.props.onUpdateViewport) {
      this.props.onUpdateViewport({
        x,
        y,
        zoom,
        scale,
        rotation,
        imageRatio,
        isZoomedOut,
      });
    }
  };

  viewer = null;

  getRef = viewer => {
    this.viewer = viewer;
  };

  goToRect = (bounds, padding, speed) => {
    if (this.viewer && this.viewer.goToRect) {
      this.viewer.goToRect(bounds, padding, speed);
    }
  };

  getMinZoom = () => {
    if (this.viewer && this.viewer.getMinZoom) {
      return this.viewer.getMinZoom();
    }
    return 1;
  };

  getMaxZoom = () => {
    if (this.viewer && this.viewer.getMaxZoom) {
      return this.viewer.getMaxZoom();
    }
    return 0;
  };

  getZoom = () => {
    if (this.viewer && this.viewer.getZoom) {
      return this.viewer.getZoom();
    }
    return 0;
  };

  zoomIn = speed => {
    if (this.viewer && this.viewer.zoomIn) {
      this.viewer.zoomIn(speed);
    }
  };

  zoomOut = speed => {
    if (this.viewer && this.viewer.zoomOut) {
      this.viewer.zoomOut(speed);
    }
  };

  resetView = speed => {
    if (this.viewer && this.viewer.resetView) {
      this.viewer.resetView(speed);
    }
  };

  getChildRatio({ ratioFromMaxWidth, ratio, scale }) {
    const width = this.props.width;

    if (ratioFromMaxWidth) {
      return ratioFromMaxWidth / width;
    }

    if (scale) {
      return scale;
    }

    if (ratio) {
      return ratio;
    }

    return window.innerWidth / width; // Defaults to max width of screen.
  }

  render() {
    const { x, y, zoom, scale, rotation, imageRatio, isZoomedOut } = this.state;
    const { maxWidth, maxHeight, children, style, ...props } = this.props;

    return (
      <div
        style={{
          maxWidth,
          maxHeight,
          position: 'relative',
          display: 'inline-block',
          overflow: 'hidden',
          width: '100%',
          ...style,
        }}
      >
        {React.Children.map(children, child => {
          if (child === null || child.props['data-static']) {
            return child;
          }
          if (child.props.viewportController === true) {
            return React.cloneElement(child, {
              getPosition: this.onUpdateViewport,
              getRef: this.getRef,
              maxWidth,
              maxHeight,
              ...props,
            });
          }
          const ratio = this.getChildRatio(child.props);
          return React.cloneElement(child, {
            style: {
              transform: `translate(${x}px,${y}px) scale(${zoom *
                scale /
                ratio}) rotate(${rotation})`,
              transformOrigin: '0 0 0',
              maxHeight,
              ...child.props.style,
              width: this.props.width * ratio,
              height: this.props.height * ratio,
              position: 'absolute',
              top: 0,
              left: 0,
            },
            position: {
              x: x * ratio,
              y: y * ratio,
              zoom,
              scale: scale / ratio,
              rotation,
              imageRatio,
              isZoomedOut,
            },
            ratio,
            maxWidth,
            ...props,
          });
        })}
      </div>
    );
  }
}

export default Viewport;
