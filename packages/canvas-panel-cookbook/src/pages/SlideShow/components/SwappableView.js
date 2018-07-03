import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import Measure from 'react-measure';

import {
  StaticImageViewport,
  FullPageViewport,
  OpenSeadragonViewport,
  SingleTileSource,
  withBemClass,
} from '@canvas-panel/core';

import './SwappableView.scss';

class SwappableView extends Component {
  state = {
    isInteractive: false,
    itemWidth: 0,
    itemHeight: 0,
  };

  constructor(props) {
    super(props);
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
  }

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
    let { isInteractive } = this.state;
    let {
      manifest,
      canvas,
      exitInteractiveModeButtonLabel,
      enterInteractiveModeButtonLabel,
    } = this.props;
    const cls = 'slide__viewport';
    const classes = [cls, isInteractive ? cls + '--interactive' : ''].join(' ');
    const viewportFocuses = this.getEmbededAnnotations(canvas).filter(
      annotation => annotation.motivation === 'layout-viewport-focus'
    );
    let initialBounds = null;
    if (viewportFocuses.length > 0) {
      // we only care about the first for now
      let viewportFocus = viewportFocuses[0];
      let position = viewportFocus.target.split('#')[1];
      let [_left, _top, _width, _height] = position
        .split(',')
        .map(i => parseInt(i, 10));
      initialBounds = {
        x: _left,
        y: _top,
        width: _width,
        height: _height,
      };
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
              initialBounds={initialBounds}
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
