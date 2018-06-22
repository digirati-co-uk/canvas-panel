import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import {
  Manifest,
  CanvasProvider,
  Fullscreen,
  RangeNavigationProvider,
} from '@canvas-panel/core';

import SimpleSlideTransition from './SimpleSlideTransition';
import ProgressIndicator from './ProgressIndicator';
import DummySlideContent from './DummySlideContent';
import SwappableView from './SwappableView';
import CanvasNavigation from './CanvasNavigation';

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
              <RangeNavigationProvider>
                {({
                  manifest,
                  canvas,
                  canvasList,
                  currentIndex,
                  previousRange,
                  nextRange,
                }) => {
                  let currentCanvas = currentIndex;
                  var slideClasses = classNames('slide', {
                    'slide--cover': currentCanvas === 0,
                    'slide--even':
                      currentCanvas !== 0 && currentCanvas % 2 === 0,
                    'slide--odd': currentCanvas % 2 !== 0,
                  });
                  let totalCanvases = canvasList.length;
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
                      <CanvasNavigation
                        previousRange={previousRange}
                        nextRange={nextRange}
                        canvasList={canvasList}
                        currentIndex={currentIndex}
                      />
                      <ProgressIndicator
                        {...{ currentCanvas, totalCanvases }}
                      />
                    </div>
                  );
                }}
              </RangeNavigationProvider>
            </Manifest>
          )}
        </Fullscreen>
      </div>
    );
  }
}
