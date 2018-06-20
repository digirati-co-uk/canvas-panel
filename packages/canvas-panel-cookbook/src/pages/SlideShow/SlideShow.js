import React, { Component } from 'react';
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
  Bem,
  functionOrMapChildren,
} from '@canvas-panel/core';

//import { FunctionOrMapChildrenType } from '@canvas-panel/core/utility/functionOrMapChildren';
import * as PropTypes from 'prop-types';
import './SlideShow.scss';

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
  state = { isInteractive: false };

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
          <FullPageViewport position="absolute" interactive={true}>
            {isInteractive ? (
              <OpenSeadragonViewport
                useMaxDimensions={true}
                osdOptions={{
                  visibilityRatio: 1,
                  constrainDuringPan: true,
                  showNavigator: false,
                }}
              />
            ) : (
              <StaticImageViewport
                draggable={false}
                viewportController={true}
                canvas={canvas}
              />
            )}
          </FullPageViewport>
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
    this.getStyle = this.getStyle.bind(this);
  }

  // static propTypes = {
  //   bem: PropTypes.instanceOf(Bem),
  //   children: functionOrMapChildren,
  // };

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
  getStyle() {
    if (this.state.direction !== 0) {
      if (this.state.direction > 0) {
        return {
          transform: 'translate(100%, 0);',
          webkitTransform: 'translate(100%, 0);',
        };
      } else {
        return {
          transform: 'translate(-100%, 0);',
          webkitTransform: 'translate(-100%, 0);',
        };
      }
    }
    return {};
  }
  render() {
    let { children, bem } = this.props;
    let { animationCache } = this.state;
    let styles = this.getStyle();
    return (
      <div className={bem}>
        <div className={bem.element('children')} style={styles}>
          {children}
        </div>
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
    return (
      <div className="slideshow-demo">
        <Fullscreen>
          {({
            toggleFullscreen,
            exitFullscreen,
            goFullscreen,
            isFullscreen,
          }) => (
            <Manifest url="https://wellcomelibrary.org/iiif/b18934717/manifest?manifest=https://wellcomelibrary.org/iiif/b18934717/manifest">
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
                    <PageTransition currentCanvas={currentCanvas}>
                      <div className={slideClasses}>
                        <SwappableView {...{ manifest, canvas }} />
                        <SimpleSlideContent
                          {...{
                            label: 'Demo label',
                            description:
                              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                      Vestibulum eget nulla ut quam bibendum rutrum at et ligula. Vestibulum \
                      quis eros dignissim, gravida nunc eget, iaculis purus. Sed vitae nunc eros. \
                      Phasellus et lacus ut ipsum rutrum dictum. Nunc dictum mi vitae lorem \
                      bibendum, ut sollicitudin diam pharetra. Nunc ante nunc, fermentum eu \
                      felis non, porta euismod elit. Nunc elementum luctus erat, eget aliquam \
                      eros tristique vitae. Aenean aliquet eros sit amet mollis lobortis. \
                      Aliquam interdum ultrices sem id porta. Curabitur massa turpis, rutrum vitae \
                      mi eu, condimentum venenatis diam. Donec at ligula convallis justo \
                      malesuada facilisis. Mauris ullamcorper sit amet turpis vel pretium.\n\
                      Quisque cursus tincidunt ligula eu porta. Pellentesque eu augue libero. \
                      Nullam ultrices augue purus, a vestibulum lorem vulputate ut. \
                      Pellentesque vulputate suscipit quam, a dignissim elit pellentesque a. \
                      Nunc commodo eget augue vel mattis. Vestibulum ut quam vitae eros rhoncus \
                      elementum. In sit amet sollicitudin dolor. Vestibulum sit amet mollis \
                      orci, eu tempus ipsum.',
                            requiredStatement: 'Lorem Ipsum',
                            containerCls: 'slide__overlay',
                          }}
                        />
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
                    </PageTransition>
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

export default SlideShow;
