import React, { Component } from 'react';
import classNames from 'classnames/bind';

import {
  Manifest,
  CanvasNavigation,
  CanvasProvider,
  Fullscreen,
} from '@canvas-panel/core';

import SimpleSlideTransition from './SimpleSlideTransition';
import ProgressIndicator from '../views/ProgressIndicator';
import DummySlideContent from '../views/DummySlideContent';
import SwappableView from '../views/SwappableView';

import './SlideShow.scss';

export default class SlideShow extends Component {
  render() {
    let { manifesturi } = this.props;
    //TODO: Make This work with the majestic nwb babbel...
    const SlideContentComponent =
      this.props.slideContentComponent || DummySlideContent;
    const SlideTransitionComponent =
      this.props.slideTransitionComponent || SimpleSlideTransition;
    return (
      <div className="slideshow">
        <Fullscreen>
          {({ exitFullscreen, goFullscreen, isFullscreen }) => (
            <Manifest url={manifesturi}>
              <CanvasProvider startCanvas={0}>
                {({ sequence, manifest, canvas, currentCanvas, dispatch }) => {
                  var slideClasses = classNames('slide', {
                    'slide--cover': currentCanvas === 0,
                    'slide--even':
                      currentCanvas !== 0 && currentCanvas % 2 === 0,
                    'slide--odd': currentCanvas % 2 !== 0,
                  });
                  let totalCanvases = sequence.getTotalCanvases();
                  return (
                    <div className="slideshow__inner-frame">
                      <SlideTransitionComponent>
                        <div className={slideClasses}>
                          <SwappableView {...{ manifest, canvas }} />
                          <SlideContentComponent canvas={canvas} />
                        </div>
                      </SlideTransitionComponent>
                      {isFullscreen ? (
                        <button
                          onClick={exitFullscreen}
                          className="fullscreen-btn fullscreen-btn--off"
                        >
                          Exit fullscreen
                        </button>
                      ) : (
                        <button
                          onClick={goFullscreen}
                          className="fullscreen-btn fullscreen-btn--on"
                        >
                          Fullscreen
                        </button>
                      )}
                      {/*<CanvasNavigation dispatch={dispatch} />*/}
                      <ProgressIndicator
                        {...{ currentCanvas, totalCanvases }}
                      />
                    </div>
                  );
                }}
              </CanvasProvider>
            </Manifest>
          )}
        </Fullscreen>
      </div>
    );
  }
}
