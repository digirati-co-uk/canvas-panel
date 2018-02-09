import React, { Component } from 'react';

import {
  Manifest,
  CanvasProvider,
  Viewport,
  SingleTileSource,
  OpenSeadragonViewport,
  SizedViewport,
  functionOrMapChildren,
} from '@canvas-panel/core';

const ViewportCover = props => {
  if (!props.viewport || props.position.isZoomedOut === false) {
    return <div />;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9,
      }}
      onClick={() => props.viewport.zoomIn() && props.viewport.zoomIn()}
    />
  );
};

class PopOutViewport extends Component {
  state = { minZoom: 1, position: null };

  setViewport = viewport => {
    this.setState({ viewport: viewport });
  };

  setPosition = position => this.setState({ position });

  render() {
    const { position } = this.state;
    const { children, ...props } = this.props;

    const style =
      position && position.isZoomedOut
        ? {
            width: '100%',
            height: 500,
            transition: 'all .2s',
          }
        : {
            width: '100%',
            height: 700,
            transition: 'all .2s',
          };

    return (
      <SizedViewport
        style={style}
        setRef={this.setViewport}
        onUpdateViewport={this.setPosition}
      >
        <ViewportCover viewport={this.state.viewport} />
        {functionOrMapChildren(children, props)}
      </SizedViewport>
    );
  }
}

class PopOut extends Component {
  render() {
    return (
      <div style={{ maxWidth: 900, margin: 'auto' }}>
        <h1>Zoom in example</h1>
        <Manifest jsonLd={require('../../../tests/patchwork')}>
          <CanvasProvider>
            <PopOutViewport>
              <SingleTileSource viewportController={true}>
                <OpenSeadragonViewport
                  useMaxDimensions={true}
                  osdOptions={{
                    visibilityRatio: 1,
                    constrainDuringPan: true,
                    showNavigator: false,
                  }}
                />
              </SingleTileSource>
            </PopOutViewport>
          </CanvasProvider>
        </Manifest>
        {new Array(50)
          .fill(1)
          .map((n, k) => <p key={k}>Lots of text lots of text</p>)}
      </div>
    );
  }
}

export default PopOut;
