import React, { Component } from 'react';

/**
 * Creates valid transforms for FF + SF9
 * @todo move to utility.
 */
function transformGenerator({
  x: dX,
  y: dY,
  scale: dScale,
  rotation: dRotation,
}) {
  const parts = [];
  const floor = val => {
    const retVal = val.toFixed(4);
    if (retVal < 0.001 && retVal > -0.001) {
      return 0;
    }
    return retVal || 0;
  };
  if (dX || dY) {
    parts.push(`translate(${floor(dX)}px,${floor(dY)}px)`);
  }
  if (dScale) {
    parts.push(`scale(${floor(dScale)})`);
  }
  if (dRotation) {
    parts.push(`rotate(${floor(dRotation)})`);
  }
  return parts.join(' ');
}

class Viewport extends Component {
  state = {
    x: 0,
    y: 0,
    zoom: 1,
    scale: 1,
    rotation: 0,
    isLoading: true,
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
      isLoading: false,
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

  shouldComponentUpdate(newProps, newState) {
    const {
      x,
      y,
      zoom,
      scale,
      rotation,
      imageRatio,
      isZoomedOut,
      isLoading,
    } = this.state;
    const { maxWidth, maxHeight, children, style, setRef } = this.props;

    return (
      x !== newState.x ||
      y !== newState.y ||
      zoom !== newState.zoom ||
      scale !== newState.scale ||
      rotation !== newState.rotation ||
      imageRatio !== newState.imageRatio ||
      isZoomedOut !== newState.isZoomedOut ||
      isLoading !== newState.isLoading ||
      setRef !== newProps.setRef ||
      maxWidth !== newProps.maxWidth ||
      maxHeight !== newProps.maxHeight ||
      children !== newProps.children ||
      style !== newProps.style
    );
  }

  render() {
    const {
      x,
      y,
      zoom,
      scale,
      rotation,
      imageRatio,
      isZoomedOut,
      isLoading,
    } = this.state;
    const { maxWidth, maxHeight, children, style, ...props } = this.props;

    return (
      <div
        style={{
          maxWidth: Number.isNaN(maxWidth) ? 'auto' : maxWidth,
          maxHeight: Number.isNaN(maxHeight) ? 'auto' : maxHeight,
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
          if (isLoading === true) {
            return <div data-loading />;
          }

          const ratio = this.getChildRatio(child.props);
          return React.cloneElement(child, {
            style: {
              transform: transformGenerator({
                x,
                y,
                scale: zoom * scale / ratio,
                rotation,
              }),
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
