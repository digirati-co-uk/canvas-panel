import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  SingleTileSource,
  OpenSeadragonViewer,
} from '@canvas-panel/core';

export default class extends Component {
  render() {
    const {
      manifest,
      canvas,
      maxHeight,
      currentCanvas,
      getRef,
      ...props
    } = this.props;
    return (
      <div>
        <Manifest url={manifest}>
          <CanvasProvider startCanvas={canvas} currentCanvas={currentCanvas}>
            <SingleTileSource>
              <OpenSeadragonViewer
                getRef={getRef}
                maxHeight={maxHeight || 500}
                {...props}
              />
            </SingleTileSource>
          </CanvasProvider>
        </Manifest>
      </div>
    );
  }
}
