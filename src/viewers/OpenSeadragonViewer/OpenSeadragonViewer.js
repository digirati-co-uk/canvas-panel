import OpenSeadragon from 'openseadragon';
import React, {Component} from 'react';

class OpenSeadragonViewer extends Component {

  asyncAddTile(args) {
    return new Promise((success, err) => {
      try {
        this.viewer.addTiledImage.call(this.viewer, {success, ...args});
      } catch (e) {
        err(e);
      }
    });
  }

  createRelativePoint(x, y) {
    return this.viewer.viewport.viewerElementToImageCoordinates(
      new OpenSeadragon.Point(x, y),
    );
  }

  createViewportPoint(x, y) {
    return this.viewer.viewport.imageToViewerElementCoordinates(
      new OpenSeadragon.Point(x, y),
    );
  }

  getImageSize() {
    return {
      width: this.props.width,
      height: this.props.height,
    };
  }

  state = {
    fallback: false,
  };

  componentWillReceiveProps(newProps) {
    const {tileSource} = this.props;

    if (newProps.tileSource !== tileSource) {
      this.viewer.close();
      this.asyncAddTile({tileSource: newProps.tileSource}).then(e => {
        this.viewer.viewport.goHome(true);
        if (newProps.onImageLoaded) {
          newProps.onImageLoaded(this.viewer, e);
        }
      });
    }

  }

  componentDidMount() {
    const {getRef, onImageLoaded, tileSource} = this.props;
    if (!tileSource) {
      console.error('Something went wrong, we cannot display the open sea dragon');
      this.setState({ fallback: true });
      return;
    }
    this.setState({ fallback: false });
    this.viewer = new OpenSeadragon({
      element: this.element,
      ajaxWithCredentials: false,
      showNavigator: true,
      showRotationControl: true,
      defaultZoomLevel: 0,
      maxZoomPixelRatio: 1,
      navigatorPosition: 'BOTTOM_RIGHT',
      animationTime: 0.3,
      immediateRender: true,
      preserveViewport: true,
      blendTime: 0.1,
      minPixelRatio: 0.5,
      visibilityRatio: 0.65,
      constrainDuringPan: false,
      showSequenceControl: false,
      showNavigationControl: false,
      showZoomControl: true,
      showHomeControl: false,
      showFullPageControl: false,
      sequenceMode: true,
    });
    if (getRef) {
      getRef(this);
    }

    this.asyncAddTile({tileSource}).then(e => {
      this.viewer.viewport.goHome(true);
      if (onImageLoaded) {
        onImageLoaded(this.viewer, e);
      }
    });
  }

  zoomIn = (e) => {
    e.preventDefault();
    this.viewer.viewport.zoomBy(1 / 0.7);
  };

  zoomOut = (e) => {
    e.preventDefault();
    this.viewer.viewport.zoomBy(0.7);
  };

  goToRect({ x, y, width, height }, padding = 0) {
    const selectHighlight = this.viewer.viewport.imageToViewportRectangle(new OpenSeadragon.Rect(
      x - (padding / 2),
      y - (padding / 2),
      width + padding,
      height + padding,
      0
    ));
    this.viewer.viewport.fitBounds(selectHighlight);
  }

  panTo(x, y) {
    this.viewer.viewport.panTo(new OpenSeadragon.Point(x, y));
  }

  zoomTo(zoom, refPoint = null, immediately = false) {
    this.viewer.viewport.zoomTo(zoom, refPoint, immediately);
  }

  getPosition() {
    if (!this.viewer) {
      return null;
    }

    const { x, y } = this.viewer.viewport.getCenter();
    return { x, y, zoom: this.viewer.viewport.getZoom() }
  }

  setRef = el => this.element = el;

  render() {
    const {height, width, maxWidth, maxHeight, showControls} = this.props;
    const heightRatio = maxHeight ? maxHeight / height : height;
    const widthRatio = maxWidth ? maxWidth / width : width;
    const scale = heightRatio < widthRatio ? heightRatio : widthRatio;
    const actualHeight = height * scale;
    const actualWidth = width * scale;

    if (this.state.fallback) {
      return null;
    }

    return (
      <div style={{position: 'relative', height: actualHeight, width: actualWidth}}>
        {showControls ? (
          <div>
            <div onClick={this.zoomIn}>{`+`}</div>
            <div onClick={this.zoomOut}>{`-`}</div>
          </div>
        ) : null}
        <div ref={this.setRef} style={{height: actualHeight, width: actualWidth}}/>
      </div>
    );
  }
}

export default OpenSeadragonViewer;
