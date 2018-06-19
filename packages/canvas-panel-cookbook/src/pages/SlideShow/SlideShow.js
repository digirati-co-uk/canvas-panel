import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  Viewport,
  StaticImageViewport,
  CanvasNavigation,
  LocaleString,
  FullPageViewport,
} from '@canvas-panel/core';

import './SlideShow.scss';

class SlideShow extends Component {
  render() {
    return (
      <div className="slideshow-demo">
        <Manifest url="https://wellcomelibrary.org/iiif/b18934717/manifest?manifest=https://wellcomelibrary.org/iiif/b18934717/manifest">
          <CanvasProvider startCanvas={0}>
            {({
              sequence,
              manifest,
              canvas,
              currentCanvas,
              startCanvas,
              dispatch,
            }) => (
              <div className="slide">
                <FullPageViewport position="absolute" interactive={false}>
                  <StaticImageViewport
                    draggable={false}
                    viewportController={true}
                    maxHeight={500}
                    maxWidth={500}
                    canvas={canvas}
                  />
                </FullPageViewport>
                <div className="canvas-overlay">
                  <LocaleString>{canvas.getLabel()}</LocaleString>
                </div>
                <CanvasNavigation dispatch={dispatch} />
              </div>
            )}
          </CanvasProvider>
        </Manifest>
      </div>
    );
  }
}

export default SlideShow;
