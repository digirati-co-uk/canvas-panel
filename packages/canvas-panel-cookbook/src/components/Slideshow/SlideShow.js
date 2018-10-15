import React, { Component } from 'react';
import {
  Manifest,
  Fullscreen,
  RangeNavigationProvider,
  withBemClass,
  Responsive,
} from '../../../../canvas-panel-core/es/index';
import MobilePageView from '../MobilePageView/MobilePageView';
import SimpleSlideTransition from '../SimpleSlideTransition/SimpleSlideTransition';
import ProgressIndicator from '../ProgressIndicator/ProgressIndicator';
import Slide from '../Slide/Slide';
import CanvasNavigation from '../CanvasNavigation/CanvasNavigation';

import './SlideShow.scss';

class SlideShow extends Component {
  state = { innerWidth: window.innerWidth };

  componentWillMount() {
    window.addEventListener('resize', this.setSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize);
  }

  setSize = () => {
    this.setState({ innerWidth: window.innerWidth });
  };

  qualifiesForMobile = () => {
    return this.state.innerWidth <= 767;
  };

  render() {
    const { manifestUri, renderPanel, bem } = this.props;
    return (
      <div
        className={bem.modifiers({
          isMobile: Responsive.md.phone(),
        })}
      >
        <Fullscreen>
          {fullscreenProps => (
            <Manifest url={manifestUri}>
              <RangeNavigationProvider>
                {rangeProps => {
                  const {
                    manifest,
                    canvas,
                    canvasList,
                    currentIndex,
                    previousRange,
                    nextRange,
                    region,
                  } = rangeProps;
                  return (
                    <div
                      className={bem.element('inner-frame')}
                      ref={fullscreenProps.ref}
                    >
                      {this.qualifiesForMobile() ? (
                        <MobilePageView
                          manifest={manifest}
                          previousRange={previousRange}
                          nextRange={nextRange}
                          fullscreenProps={fullscreenProps}
                          {...rangeProps}
                        />
                      ) : (
                        <React.Fragment>
                          <SimpleSlideTransition id={currentIndex}>
                            <Slide
                              // key={currentIndex}
                              fullscreenProps={fullscreenProps}
                              behaviors={canvas.__jsonld.behavior || []}
                              manifest={manifest}
                              canvas={canvas}
                              region={region}
                              renderPanel={renderPanel}
                            />
                          </SimpleSlideTransition>
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
                        </React.Fragment>
                      )}
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
