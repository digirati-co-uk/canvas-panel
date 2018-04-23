import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  SingleTileSource,
  OpenSeadragonViewer,
  FullPageViewport,
} from '@canvas-panel/core';

export default class extends Component {
  render() {
    const {
      manifest,
      canvas,
      currentCanvas,
      getRef,
      maxHeight,
      ...props
    } = this.props;

    return (
      <Manifest url={manifest}>
        <CanvasProvider startCanvas={canvas} currentCanvas={currentCanvas}>
          <SingleTileSource>
            {maxHeight ? (
              <OpenSeadragonViewer
                getRef={getRef}
                maxHeight={maxHeight}
                {...props}
              />
            ) : (
              <FullPageViewport
                position="absolute"
                interactive={true}
                getRef={getRef}
              >
                <OpenSeadragonViewer viewportController={true} {...props} />
              </FullPageViewport>
            )}
          </SingleTileSource>
        </CanvasProvider>
      </Manifest>
    );
  }
}
