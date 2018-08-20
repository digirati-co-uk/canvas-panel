import React, { Component } from 'react';
import {
  Manifest,
  Fullscreen,
  RangeNavigationProvider,
  withBemClass,
} from '@canvas-panel/core';
import FullscreenButton from './FullscreenButton/FullscreenButton';
import SimpleSlideTransition from './SimpleSlideTransition';
import ProgressIndicator from './ProgressIndicator';
import Slide from './Slide/Slide';
import CanvasNavigation from './CanvasNavigation';

import './SlideShow.scss';

class SlideShow extends Component {
  render() {
    const { manifestUri, children, bem } = this.props;
    return (
      <div className={bem}>
        <Fullscreen>
          {fullscreenProps => (
            <Manifest url={manifestUri}>
              <RangeNavigationProvider>
                {({
                  manifest,
                  canvas,
                  canvasList,
                  currentIndex,
                  previousRange,
                  nextRange,
                  region,
                }) => {
                  return (
                    <div className={bem.element('inner-frame')}>
                      <SimpleSlideTransition id={currentIndex}>
                        <Slide
                          key={currentIndex}
                          behaviors={canvas.__jsonld.behavior || []}
                          manifest={manifest}
                          canvas={canvas}
                          region={region}
                        >
                          {children}
                        </Slide>
                      </SimpleSlideTransition>
                      <FullscreenButton {...fullscreenProps} />
                      <CanvasNavigation
                        previousRange={previousRange}
                        nextRange={nextRange}
                        canvasList={canvasList}
                        currentIndex={currentIndex}
                      />
                      <ProgressIndicator
                        currentCanvas={currentIndex}
                        totalCanvases={canvasList.length}
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

export default withBemClass('slideshow')(SlideShow);
