import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Measure from 'react-measure';

import {
  FullPageViewport,
  SingleTileSource,
  withBemClass,
  OpenSeadragonViewport,
} from '@canvas-panel/core';

import './SwappableView.scss';

//---------------------------------------
// NOTE: this code should not be in here
// just I've already created it when Stephen
// told me to NOT to. Obviosly, it is crutial
// to undersand that it is cannot stay, but
// on the other hand if, I don't have this
// here I cannot satisfy the requirements
// from Tom.
//---------------------------------------
function getEmbededAnnotations(canvas) {
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

function createRegionFromAnnotations(canvas) {
  const viewportFocuses = getEmbededAnnotations(canvas).filter(
    annotation => annotation.motivation === 'layout-viewport-focus'
  );
  let initialBounds = null;
  if (viewportFocuses.length > 0) {
    // we only care about the first for now
    let viewportFocus = viewportFocuses[0];
    let parametersStr = viewportFocus.target.split('#')[1];
    let parameters = parametersStr
      .split('&')
      .map(el => el.split('='))
      .reduce((pre, cur) => {
        pre[cur[0]] = cur[1];
        return pre;
      }, {});
    let position = parameters.xywh;
    if (position) {
      let [_left, _top, _width, _height] = position
        .split(',')
        .map(i => parseInt(i, 10));
      return {
        expanded: true,
        scale: 1,
        unit: 'pixel',
        x: _left,
        y: _top,
        width: _width,
        height: _height,
      };
    }
    return null;
  }
}

class SwappableView extends Component {
  state = {
    isInteractive: false,
    itemWidth: 0,
    itemHeight: 0,
  };

  constructor(props) {
    super(props);
    this.region = this.props.region;
    if (!this.region) {
      this.region = createRegionFromAnnotations(this.props.canvas);
    }
    this.setViewportToStatic = this.setViewportToStatic.bind(this);
    this.setViewportToInteractive = this.setViewportToInteractive.bind(this);
    this.setViewport = this.setViewport.bind(this);
  }
  static propTypes = {
    exitInteractiveModeButtonLabel: PropTypes.string,
    enterInteractiveModeButtonLabel: PropTypes.string,
    canvas: PropTypes.any,
    manifest: PropTypes.any,
  };

  static defaultProps = {
    exitInteractiveModeButtonLabel: 'Exit Interactive Mode',
    enterInteractiveModeButtonLabel: 'Explore',
  };

  setViewportToStatic() {
    this.setState({
      isInteractive: false,
    });
  }

  setViewportToInteractive() {
    this.setState({
      isInteractive: true,
    });
  }

  setViewport(viewport) {
    this.setState({ viewport });
    if (viewport && this.region) {
      viewport.goToRect(this.region, 0, 0);
    }
  }

  render() {
    let { isInteractive } = this.state;
    let {
      manifest,
      canvas,
      exitInteractiveModeButtonLabel,
      enterInteractiveModeButtonLabel,
    } = this.props;
    const cls = 'slide__viewport';
    const classes = [cls, isInteractive ? cls + '--interactive' : ''].join(' ');
    // TODO: comment this if showing it to Stephen,
    // uncomment if showing it to Tom. And reach an aggreement...
    if (!this.region) {
      this.region = createRegionFromAnnotations(canvas);
    }

    if (this.state.viewport && this.region) {
      this.state.viewport.goToRect(this.region, 0, 0);
    }
    return (
      <div
        ref={el => {
          this.containerEl = el;
        }}
        className={classes}
      >
        <SingleTileSource {...{ manifest, canvas }}>
          <FullPageViewport
            setRef={this.setViewport}
            position="absolute"
            interactive={isInteractive}
          >
            <OpenSeadragonViewport
              useMaxDimensions={true}
              interactive={isInteractive}
              osdOptions={{
                visibilityRatio: 1,
                constrainDuringPan: true,
                showNavigator: false,
                immediateRender: false,
                preload: true,
              }}
            />
          </FullPageViewport>
        </SingleTileSource>
        {isInteractive ? (
          <button
            onClick={this.setViewportToStatic}
            className="slide__interactive-btn"
          >
            {exitInteractiveModeButtonLabel}
          </button>
        ) : (
          <button
            onClick={this.setViewportToInteractive}
            className="slide__interactive-btn"
          >
            {enterInteractiveModeButtonLabel}
          </button>
        )}
      </div>
    );
  }
}

export default SwappableView;
