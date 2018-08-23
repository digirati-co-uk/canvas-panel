import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import {
  FullPageViewport,
  SingleTileSource,
  withBemClass,
  OpenSeadragonViewport,
  parseSelectorTarget,
} from '@canvas-panel/core';

import './SwappableViewer.scss';
import ZoomButtons from '../ZoomButtons/ZoomButtons';
import FullscreenButton from '../FullscreenButton/FullscreenButton';

function getEmbeddedAnnotations(canvas) {
  return (canvas.__jsonld.annotations || []).reduce((list, next) => {
    if (next.type === 'AnnotationPage') {
      return (next.items || []).reduce((innerList, annotation) => {
        innerList.push(annotation);
        return innerList;
      }, list);
    }
    if (next.type === 'Annotation') {
      list.push(next);
    }
    return list;
  }, []);
}

function createRegionFromAnnotations(canvas) {
  const viewportFocuses = getEmbeddedAnnotations(canvas).filter(
    annotation => annotation.motivation === 'layout-viewport-focus'
  );
  if (viewportFocuses.length > 0) {
    return parseSelectorTarget(
      viewportFocuses[0].target || viewportFocuses[0].on
    );
  }
}

class SwappableViewer extends Component {
  state = {
    isInteractive: false,
    itemWidth: 0,
    itemHeight: 0,
  };

  osdOptions = {
    visibilityRatio: 1,
    constrainDuringPan: true,
    showNavigator: false,
    immediateRender: false,
    preload: true,
  };

  static propTypes = {
    canvas: PropTypes.any,
    manifest: PropTypes.any,
    isInteractive: PropTypes.bool,
    fullscreenProps: PropTypes.shape({
      isFullscreen: PropTypes.bool,
      isFullscreenEnabled: PropTypes.bool,
      exitFullscreen: PropTypes.func,
      goFullscreen: PropTypes.func,
    }),
  };

  static defaultProps = {
    isInteractive: false,
  };

  setViewport = viewport => {
    this.viewport = viewport;
    if (this.viewport && this.props.region) {
      this.viewport.goToRect(this.props.region, 0, 0);
    }
  };

  componentDidMount() {
    if (this.props.region) {
      this.viewport.goToRect(this.props.region, 0, 0.0000001);
    } else {
      const region = createRegionFromAnnotations(this.props.canvas);
      if (region) {
        this.setState({ region });
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.canvas !== this.props.canvas && this.state.viewport) {
      if (nextProps.region) {
        this.viewport.goToRect(nextProps.region, 0, 0.00000001);
      } else {
        const region = createRegionFromAnnotations(this.props.canvas);
        if (region) {
          this.setState({ region });
        }
      }
    }
  }

  zoomOut = () => {
    this.viewport.zoomOut();
  };

  zoomIn = () => {
    this.viewport.zoomIn();
  };

  updateViewport = ({ isZoomedOut }) => {
    if (this.state.isZoomedOut === false && isZoomedOut) {
      this.viewport.resetView();
    }
    this.setState({ isZoomedOut });
  };

  render() {
    const { region, isZoomedOut } = this.state;
    const {
      isInteractive,
      manifest,
      canvas,
      bem,
      fullscreenProps,
    } = this.props;

    return (
      <div
        className={bem
          .element('viewport')
          .modifiers({ interactive: isInteractive })}
        onWheel={this.onWheel}
      >
        <SingleTileSource manifest={manifest} canvas={canvas}>
          <FullscreenButton {...fullscreenProps} />
          <ZoomButtons onZoomOut={this.zoomOut} onZoomIn={this.zoomIn} />
          <FullPageViewport
            onUpdateViewport={this.updateViewport}
            setRef={this.setViewport}
            position="absolute"
            interactive={isInteractive || !isZoomedOut}
          >
            <OpenSeadragonViewport
              useMaxDimensions={true}
              interactive={isInteractive}
              osdOptions={this.osdOptions}
              initialBounds={region}
            />
          </FullPageViewport>
        </SingleTileSource>
      </div>
    );
  }
}

export default withBemClass('slide')(SwappableViewer);
