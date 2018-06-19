import React, { Component } from 'react';
import classNames from 'classnames/bind';
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
            }) => {
              var slideClasses = classNames('slide', {
                'slide--cover': currentCanvas === 0,
                'slide--even': currentCanvas !== 0 && currentCanvas % 2 === 0,
                'slide--odd': currentCanvas % 2 !== 0,
              });
              return (
                <div className={slideClasses}>
                  <div className="slide__viewport">
                    <FullPageViewport position="absolute" interactive={false}>
                      <StaticImageViewport
                        draggable={false}
                        viewportController={true}
                        canvas={canvas}
                      />
                    </FullPageViewport>
                  </div>
                  <div className="slide__overlay">
                    <h2>Demo Text</h2>
                    <p>Lorem Ipsum</p>
                  </div>
                  <CanvasNavigation dispatch={dispatch} />
                </div>
              );
            }}
          </CanvasProvider>
        </Manifest>
      </div>
    );
  }
}

export default SlideShow;
