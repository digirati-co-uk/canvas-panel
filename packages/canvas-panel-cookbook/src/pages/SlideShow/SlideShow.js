import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import {
  Manifest,
  CanvasProvider,
  StaticImageViewport,
  CanvasNavigation,
  FullPageViewport,
  Fullscreen,
  OpenSeadragonViewport,
  SingleTileSource,
  withBemClass,
} from '@canvas-panel/core';

import lorem from 'lorem-ipsum-simple';
import * as PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SlideShow.scss';

const lipsumN = paragraphs =>
  Array.apply(null, Array(paragraphs)).map(() =>
    lorem(100).replace(/\s+/g, ' ')
  );

const lipsumP = paragraphs =>
  lipsumN(paragraphs).map((lipsum, idx) => <p key={idx}>{lipsum}</p>);

console.log(lipsumN(2));
const demoData = {
  label: 'Demo label',
  description: lipsumN(2).join('\n'),
  requiredStatement: 'Lorem Ipsum',
  containerCls: 'slide__overlay',
};

const ProgressIndicatorBase = props => {
  const { currentCanvas, totalCanvases, bem } = props;
  return (
    <div className={bem}>
      <div className={bem.element('track')}>
        <div
          className={bem.element('value')}
          style={{
            width: (currentCanvas / totalCanvases) * 100 + '%',
          }}
        />
      </div>
    </div>
  );
};

const ProgressIndicator = withBemClass('progress-indicator')(
  ProgressIndicatorBase
);

const SimpleSlideContent = props => {
  const { label, description, requiredStatement, containerCls } = props;
  const descriptionLines = (description || '')
    .split(/\n+/g)
    .map((line, idx) => (
      <p
        key={'description_' + idx}
        className="slide__text"
        title="canvas-description"
      >
        {line}
      </p>
    ));
  return (
    <div className={containerCls}>
      <h2 className="slide__title" title="canvas-label">
        {label}
      </h2>
      {descriptionLines}
      <p className="slide__text" title="canvas-required-statement">
        {requiredStatement}
      </p>
    </div>
  );
};

class SwappableView extends Component {
  state = {
    isInteractive: false,
    itemWidth: 0,
    itemHeight: 0,
  };

  constructor(props) {
    super(props);
    this.setViewportToStatic = this.setViewportToStatic.bind(this);
    this.setViewportToInteractive = this.setViewportToInteractive.bind(this);
  }
  static propTypes = {
    exitInteractiveModeButtonLabel: PropTypes.string,
    enterInteractiveModeButtonLabel: PropTypes.string,
    canvas: PropTypes.any,
    manifest: PropTypes.any,
  };

  static defaultProps = {
    exitInteractiveModeButtonLabel: 'Exit Interactive Mode',
    enterInteractiveModeButtonLabel: 'Explore',
  };

  setViewportToStatic() {
    this.setState({
      isInteractive: false,
    });
  }

  setViewportToInteractive() {
    this.setState({
      isInteractive: true,
    });
  }

  render() {
    let { isInteractive } = this.state;
    let {
      manifest,
      canvas,
      exitInteractiveModeButtonLabel,
      enterInteractiveModeButtonLabel,
    } = this.props;
    return (
      <div className="slide__viewport">
        <SingleTileSource {...{ manifest, canvas }}>
          {isInteractive ? (
            <FullPageViewport position="absolute" interactive={true}>
              <OpenSeadragonViewport
                useMaxDimensions={true}
                osdOptions={{
                  visibilityRatio: 1,
                  constrainDuringPan: true,
                  showNavigator: false,
                }}
              />
            </FullPageViewport>
          ) : (
            <div className="slide-cover">
              <StaticImageViewport
                draggable={false}
                viewportController={true}
                canvas={canvas}
              />
            </div>
          )}
        </SingleTileSource>
        {isInteractive ? (
          <button
            onClick={this.setViewportToStatic}
            className="interactive-btn interactive-btn--off"
          >
            {exitInteractiveModeButtonLabel}
          </button>
        ) : (
          <button
            onClick={this.setViewportToInteractive}
            className="interactive-btn interactive-btn--on"
          >
            {enterInteractiveModeButtonLabel}
          </button>
        )}
      </div>
    );
  }
}

class PageTransitionBase extends Component {
  state = {
    animationCache: '',
    direction: 0,
  };
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    let transitionEl = document.querySelector('.transition');
    let oldState = document.querySelector('.transition__children');
    let direction = nextProps.currentCanvas - this.props.currentCanvas;
    this.state.animationCache = oldState.innerHTML;
    this.state.direction = nextState.direction = direction;
    if (direction !== 0) {
      setTimeout(() => {
        transitionEl.classList.add(
          'transition' + (direction > 0 ? '--forward' : '--backward')
        );
      }, 0);
    }
  }
  render() {
    let { children, bem } = this.props;
    let { animationCache } = this.state;
    return (
      <div className={bem}>
        <div className={bem.element('children')}>{children}</div>
        <div
          className={bem.element('animation')}
          dangerouslySetInnerHTML={{
            __html: animationCache,
          }}
        />
      </div>
    );
  }
}

const PageTransition = withBemClass('transition')(PageTransitionBase);

class SlideShow extends Component {
  render() {
    let { manifesturi } = this.props;
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
                    <TransitionGroup className="slide-transitions">
                      <CSSTransition
                        key={'canvas_' + currentCanvas}
                        timeout={500}
                        classNames="fade"
                      >
                        <div className={slideClasses}>
                          <SwappableView {...{ manifest, canvas }} />
                          <SimpleSlideContent {...demoData} />
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
                              Go fullscreen
                            </button>
                          )}
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
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

class SlideShowConfigurator extends Component {
  render() {
    let { children } = this.props;
    return (
      <div className="slideshow-configurator">
        <div className="slideshow-configurator__panel">
          <form>
            <legend>Configuration</legend>
            <label>Manifest url</label>
            <input name="manifest" />
          </form>
        </div>
        <div className="slideshow-configurator__previews">{children}</div>
      </div>
    );
  }
}

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
            <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest?manifest=https://wellcomelibrary.org/iiif/b18934717/manifest" />
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
            <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest?manifest=https://wellcomelibrary.org/iiif/b18934717/manifest" />
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
            <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest?manifest=https://wellcomelibrary.org/iiif/b18934717/manifest" />
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
              <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest?manifest=https://wellcomelibrary.org/iiif/b18934717/manifest" />
            </SlideShowConfigurator>
          </div>
        </section>
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
