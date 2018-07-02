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

import SlideStaticImageViewport from './SlideStaticImageViewport';

import './SwappableView.scss';

class StaticSlideViewportBounds extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1,
    },
  };

  render() {
    const { style, ...props } = this.props;
    const { width, height } = this.state.dimensions;
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div className="slide-cover">
            {React.Children.map(props.children, child => {
              return React.cloneElement(child, {
                ...child.props,
                maxWidth: width,
                maxHeight: height,
              });
            })}
          </div>
        )}
      </Measure>
    );
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
    this.setViewportToStatic = this.setViewportToStatic.bind(this);
    this.setViewportToInteractive = this.setViewportToInteractive.bind(this);
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
    return (
      <div className={classes}>
        <SingleTileSource {...{ manifest, canvas }}>
          {isInteractive ? (
            <FullPageViewport position="absolute" interactive={true}>
              <OpenSeadragonViewport
                useMaxDimensions={true}
                osdOptions={{
                  visibilityRatio: 1,
                  constrainDuringPan: true,
                  showNavigator: false,
                }}
              />
            </FullPageViewport>
          ) : (
            <StaticSlideViewportBounds>
              <SlideStaticImageViewport
                draggable={false}
                viewportController={false}
                canvas={canvas}
              />
            </StaticSlideViewportBounds>
          )}
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
