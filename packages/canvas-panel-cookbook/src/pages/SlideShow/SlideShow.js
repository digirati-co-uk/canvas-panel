import React, { Component } from 'react';

import classNames from 'classnames/bind';
import {
  Manifest,
  CanvasProvider,
  CanvasNavigation,
  Fullscreen,
  withBemClass,
} from '@canvas-panel/core';

import './SlideShow.scss';

import { default as SimpleSlideTransition } from './components/SimpleSlideTransition';

import { default as ProgressIndicator } from './views/ProgressIndicator';
import { default as DummySlideContent } from './views/DummySlideContent';
import { default as P2SlideContent } from './views/P2SlideContent';
import { default as SwappableView } from './views/SwappableView';

class SlideShow extends Component {
  render() {
    let { manifesturi } = this.props;
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
                    <SlideTransitionComponent>
                      <div className={slideClasses}>
                        <SwappableView {...{ manifest, canvas }} />
                        <SlideContentComponent canvas={canvas} />
                        <CanvasNavigation dispatch={dispatch} />
                        <ProgressIndicator
                          {...{ currentCanvas, totalCanvases }}
                        />
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
                      </div>
                    </SlideTransitionComponent>
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

class SlideShowConfiguratorBase extends Component {
  render() {
    let { children, bem } = this.props;
    return (
      <div className={bem}>
        <div className={bem.element('panel')}>
          <form>
            <legend>Configuration</legend>
            <label>Manifest url</label>
            <input name="manifest" />
          </form>
        </div>
        <div className={bem.element('previews')}>{children}</div>
      </div>
    );
  }
}

const SlideShowConfigurator = withBemClass('slideshow-configurator')(
  SlideShowConfiguratorBase
);

class SlideShowDemoBase extends Component {
  render() {
    let { bem } = this.props;
    return (
      <article className={bem}>
        <h1 className={bem.element('title')}>SlideShow Component</h1>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>Small Inline SlideShow</h2>
          <p>
            This example is the most basic version of the slideshow embedded
            into a webpage.
          </p>
          <div
            style={{
              width: 1024,
              height: 768,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest" />
          </div>
        </section>
        <section className={bem.element('section').modifier('full-width')}>
          <h2 className={bem.element('subtitle')}>Full with SlideShow</h2>
          <div
            style={{
              width: '100vw',
              height: 'calc(100vh - 40px)',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <SlideShow
              manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest"
              slideContentComponent={P2SlideContent}
            />
          </div>
        </section>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>Custom Styles</h2>
          <div
            style={{
              width: 1024,
              height: 768,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest" />
          </div>
        </section>
        <section className={bem.element('section').modifier('full-width')}>
          <h2 className={bem.element('subtitle')}>Configure Your Own</h2>
          <div
            style={{
              width: '100vw',
              height: 'calc(100vh - 40px)',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <SlideShowConfigurator>
              <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest" />
            </SlideShowConfigurator>
          </div>
        </section>
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
