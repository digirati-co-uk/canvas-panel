import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import {
  Manifest,
  CanvasProvider,
  Fullscreen,
  RangeNavigationProvider,
  functionOrMapChildren,
} from '@canvas-panel/core';

import SimpleSlideTransition from './SimpleSlideTransition';
import ExperimentalSlideTransition from './ExperimentalSlideTransition';
import ProgressIndicator from './ProgressIndicator';
import DummySlideContent from './DummySlideContent';
import SwappableView from './SwappableView';
import CanvasNavigation from './CanvasNavigation';

import './SlideShow.scss';

export default class SlideShow extends Component {
  render() {
    let { manifesturi, children } = this.props;
    //TODO: Make This work with the majestic nwb babbel...
    // const SlideTransitionComponent =
    //   this.props.slideTransitionComponent || SimpleSlideTransition;
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
                  var slideClasses = classNames.apply(
                    null,
                    ['slide'].concat(
                      (canvas.__jsonld.behavior || []).map(
                        behaviour => `slide--${behaviour}`
                      )
                    )
                  );
                  let totalCanvases = canvasList.length;
                  return (
                    <div className="slideshow__inner-frame">
                      <SimpleSlideTransition>
                        <div className={slideClasses}>
                          <SwappableView {...{ manifest, canvas }} />
                          {functionOrMapChildren(children, {
                            canvas: canvas,
                          })}
                        </div>
                      </SimpleSlideTransition>
                      {document.body.requestFullScreen ||
                      document.body.webkitRequestFullScreen ||
                      document.body.oRequestFullScreen ||
                      document.body.msRequestFullScreen ? (
                        isFullscreen ? (
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
                        )
                      ) : (
                        ''
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
