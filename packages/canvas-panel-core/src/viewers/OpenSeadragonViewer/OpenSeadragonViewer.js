/**
 * @flow
 */

import OpenSeadragon from 'openseadragon';
import React, { Component } from 'react';

type OpenSeadragonViewerPropTypes = {
  width: number,
  height: number,
  tileSources: Array<any>,
  onImageLoaded: (OpenSeadragon, any) => any,
  maxWidth: ?number,
  maxHeight: ?number,
  showControls: ?boolean,
  getRef: any => void,
  osdOptions: any,
};

type OpenSeadragonViewerState = {
  fallback: boolean,
};

type Bounds = { x: number, y: number, width: number, height: number };

class OpenSeadragonViewer extends Component<
  OpenSeadragonViewerPropTypes,
  OpenSeadragonViewerState
> {
  state = {
    fallback: false,
  };
  viewer: ?OpenSeadragon = null;
  element: any;
  static defaultProps = {
    osdOptions: {},
  };

  asyncAddTile(args: any): Promise<void> {
    return new Promise((success, err) => {
      if (!this.viewer) {
        return null;
      }

      try {
        this.viewer.addTiledImage.call(this.viewer, { success, ...args });
      } catch (e) {
        err(e);
      }
    });
  }

  createRelativePoint(x: number, y: number): ?OpenSeadragon.Point {
    if (!this.viewer) {
      return null;
    }

    return this.viewer.viewport.viewerElementToImageCoordinates(
      new OpenSeadragon.Point(x, y)
    );
  }

  createViewportPoint(x: number, y: number) {
    if (!this.viewer) {
      return null;
    }
    return this.viewer.viewport.imageToViewerElementCoordinates(
      new OpenSeadragon.Point(x, y)
    );
  }

  getImageSize() {
    return {
      width: this.props.width,
      height: this.props.height,
    };
  }

  componentWillReceiveProps(newProps: OpenSeadragonViewerPropTypes) {
    const { tileSources } = this.props;

    if (newProps.tileSources !== tileSources && this.viewer) {
      this.viewer.close();
      Promise.all(
        newProps.tileSources.map(tileSource =>
          this.asyncAddTile({ tileSource })
        )
      ).then(e => {
        if (this.viewer) {
          this.viewer.viewport.goHome(true);
          if (newProps.onImageLoaded) {
            newProps.onImageLoaded(this.viewer, e);
          }
        }
      });
    }
  }

  componentDidMount() {
    const { getRef, onImageLoaded, tileSources, osdOptions } = this.props;
    if (!tileSources) {
      console.error(
        'Something went wrong, we cannot display the open sea dragon'
      );
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
      ...osdOptions,
    });
    if (getRef) {
      getRef(this);
    }

    Promise.all(
      tileSources.map(tileSource => this.asyncAddTile({ tileSource }))
    ).then(e => {
      if (this.viewer) {
        this.viewer.viewport.goHome(true);
      }
      if (onImageLoaded) {
        onImageLoaded(this.viewer, e);
      }
    });
  }

  zoomIn = (speed: number) => {
    this.viewportAction('zoomBy', [1 / 0.7], speed);
  };

  zoomOut = (speed: number) => {
    this.viewportAction('zoomBy', [0.7], speed);
  };

  resetView = (speed: number) => {
    this.viewportAction('goHome', [], speed);
  };

  goToRect(
    { x, y, width, height }: Bounds,
    padding: number = 0,
    speed: ?number
  ) {
    if (!this.viewer) {
      return null;
    }
    const selectHighlight = this.viewer.viewport.imageToViewportRectangle(
      new OpenSeadragon.Rect(
        x - padding / 2,
        y - padding / 2,
        width + padding,
        height + padding,
        0
      )
    );

    this.viewportAction('fitBounds', [selectHighlight], speed || 1);
  }

  panTo(x: number, y: number, speed: number) {
    this.viewportAction('panTo', [new OpenSeadragon.Point(x, y)], speed);
  }

  zoomTo(
    zoom: number,
    refPoint: OpenSeadragon.Point = null,
    immediately: boolean = false,
    speed: number
  ) {
    this.viewportAction('zoomTo', [zoom, refPoint, immediately], speed);
  }

  viewportAction(name: string, args: Array<any> = [], speed: number) {
    if (!this.viewer) {
      return null;
    }
    const func = this.viewer.viewport[name];
    if (func) {
      if (speed) {
        return this.runAtSpeed(
          speed,
          () => (this.viewer ? func.apply(this.viewer.viewport, args) : null)
        );
      }
      return this.viewer ? func.apply(this.viewer.viewport, args) : null;
    }
  }

  runAtSpeed(speed: number, callback: () => any) {
    if (!this.viewer) {
      return null;
    }

    const centerSpringX = this.viewer.viewport.centerSpringX.animationTime;
    const centerSpringY = this.viewer.viewport.centerSpringY.animationTime;
    const zoomSprint = this.viewer.viewport.zoomSpring.animationTime;

    this.viewer.viewport.centerSpringX.animationTime = speed;
    this.viewer.viewport.centerSpringY.animationTime = speed;
    this.viewer.viewport.zoomSpring.animationTime = speed;

    callback();

    if (!this.viewer) {
      return null;
    }

    this.viewer.viewport.centerSpringX.animationTime = centerSpringX;
    this.viewer.viewport.centerSpringY.animationTime = centerSpringY;
    this.viewer.viewport.zoomSpring.animationTime = zoomSprint;
  }

  getPosition() {
    if (!this.viewer) {
      return null;
    }

    const { x, y } = this.viewer.viewport.getCenter();

    if (!this.viewer) {
      return null;
    }

    return { x, y, zoom: this.viewer.viewport.getZoom() };
  }

  setRef = (el: any) => (this.element = el);

  render() {
    const { height, width, maxWidth, maxHeight, showControls } = this.props;
    const heightRatio = maxHeight ? maxHeight / height : height;
    const widthRatio = maxWidth ? maxWidth / width : width;
    const scale = heightRatio < widthRatio ? heightRatio : widthRatio;
    const actualHeight = height * scale;
    const actualWidth = width * scale;

    if (this.state.fallback) {
      return null;
    }

    return (
      <div
        style={{
          position: 'relative',
          height: actualHeight,
          width: actualWidth,
        }}
      >
        {showControls ? (
          <div>
            <div onClick={this.zoomIn}>{`+`}</div>
            <div onClick={this.zoomOut}>{`-`}</div>
          </div>
        ) : null}
        <div
          ref={this.setRef}
          style={{ height: actualHeight, width: actualWidth }}
        />
      </div>
    );
  }
}

export default OpenSeadragonViewer;
