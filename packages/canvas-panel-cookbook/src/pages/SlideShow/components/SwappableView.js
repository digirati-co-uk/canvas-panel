import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

import {
  StaticImageViewport,
  FullPageViewport,
  OpenSeadragonViewport,
  SingleTileSource,
  withBemClass,
} from '@canvas-panel/core';

import './SwappableView.scss';

const StaticSlideViewportBounds = props => (
  <div className="slide-cover">{props.children}</div>
);

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
    return (
      <div className="slide__viewport">
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
              <StaticImageViewport
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
