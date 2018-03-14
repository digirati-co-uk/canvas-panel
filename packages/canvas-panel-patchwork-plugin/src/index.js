import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Manifest,
  CanvasProvider,
  Viewport,
  SingleTileSource,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  AnnotationDetail,
  AnnotationCanvasRepresentation,
  Fullscreen,
  FullPageViewport,
  Bem,
  withBemClass,
} from '@canvas-panel/core';

const defaultConfiguration = {
  cssClassPrefix: '',
  manifest: null,
  jsonLdManifest: null,
  cssClassMap: {},
  animationSpeed: 500,
  animationSpeedMap: {},
  fitContainer: false,
  // fixedSize: null, // { x, y }
  height: 500,
  annotationMargin: 600,
  width: 1200,
  mobileHeight: window.innerWidth,
  renderAnnotation: null,
  allowFullScreen: true,
  events: {},
  osdOptions: {},
  dispatch: () => null,
  disableMouseEventsOnMobile: true,
  mobileBreakpoint: 639,
  growthStyle: 'fixed',
  closeText: '×',
  relativeContainer: true,
  clickToClose: true,
};

const AdaptiveViewport = ({
  fullViewport,
  isFullscreen,
  maxWidth,
  maxHeight,
  ...props
}) => {
  if (fullViewport || isFullscreen) {
    return (
      <FullPageViewport position="absolute" interactive={true} {...props}>
        {props.children}
      </FullPageViewport>
    );
  }

  return (
    <Viewport maxWidth={maxWidth} maxHeight={maxHeight} {...props}>
      {props.children}
    </Viewport>
  );
};

const FullScreenToggle = withBemClass('fullscreen-toggle')(
  ({ bem, toggleFullscreen, isFullscreen, mobileBreakpoint }) => (
    <button
      className={bem.modifiers({
        'is-fullscreen': isFullscreen,
        'is-mobile': window.innerWidth < mobileBreakpoint,
      })}
      onClick={toggleFullscreen}
    >
      {isFullscreen
        ? 'exit'
        : window.innerWidth < mobileBreakpoint
          ? 'explore in fullscreen'
          : 'fullscreen'}
    </button>
  )
);

const FullscreenCover = withBemClass('fullscreen-cover')(
  ({ toggleFullscreen, bem }) => (
    <div className={bem} onClick={toggleFullscreen} />
  )
);

class PatchworkPlugin extends Component {
  viewport = null;
  animationSpeed = 1;
  state = { annotation: null, isMobileFullscreen: false };

  static defaultProps = defaultConfiguration;

  static propTypes = {};

  setViewport = viewport => (this.viewport = viewport);

  onClickAnnotation = (annotation, bounds) => {
    const { clickToClose } = this.props;
    this.dispatch('onClickAnnotation', { annotation, bounds });

    if (
      clickToClose &&
      (this.state.annotation && this.state.annotation.id === annotation.id)
    ) {
      return this.onClose();
    }

    this.setState({ annotation });
    this.viewport.goToRect(
      bounds,
      this.props.annotationMargin,
      this.getAnimationSpeed('onClick')
    );
  };

  getAnimationSpeed(name) {
    if (this.props.animationSpeedMap[name]) {
      return this.props.animationSpeedMap[name] / 1000;
    }
    return this.props.animationSpeed / 1000;
  }

  toggleMobileFullscreen = () => {
    this.setState({ isMobileFullscreen: !this.state.isMobileFullscreen });
  };

  onClose = () => {
    this.dispatch('onClose', { annotation: this.state.annotation });
    this.setState({ annotation: null });
    this.viewport.resetView(this.getAnimationSpeed('onClose'));
  };

  dispatch = (name, args) => {
    if (this.props.dispatch) {
      this.props.dispatch(name, args, this.viewport);
    }
    if (this.props.events[name]) {
      this.props.events[name](args, this.viewport);
    }
  };

  render() {
    const {
      manifest,
      jsonLdManifest,
      canvas,
      mobileHeight,
      height: desktopHeight,
      width,
      osdOptions,
      cssClassMap,
      cssClassPrefix,
      growthStyle,
      closeText,
      relativeContainer,
      fitContainer,
      mobileBreakpoint,
    } = this.props;
    const height =
      window.innerWidth < mobileBreakpoint ? mobileHeight : desktopHeight;

    const state = this.state;

    return (
      <div style={relativeContainer ? { position: 'relative' } : {}}>
        <Fullscreen>
          {({ isFullscreen, fullscreenEnabled, toggleFullscreen }) => (
            <div>
              <Bem cssClassMap={cssClassMap} prefix={cssClassPrefix}>
                <Manifest url={manifest} jsonLd={jsonLdManifest}>
                  <CanvasProvider startCanvas={canvas}>
                    <AdaptiveViewport
                      isFullscreen={
                        fullscreenEnabled
                          ? isFullscreen
                          : state.isMobileFullscreen
                      }
                      fullViewport={fitContainer}
                      maxWidth={width}
                      maxHeight={height}
                      setRef={this.setViewport}
                    >
                      <SingleTileSource viewportController={true}>
                        <OpenSeadragonViewport>
                          <OpenSeadragonViewer
                            useMaxDimensions={true}
                            osdOptions={{
                              visibilityRatio: 1,
                              constrainDuringPan: true,
                              showNavigator: false,
                              immediateRender: false,
                              ...osdOptions,
                            }}
                          />
                        </OpenSeadragonViewport>
                      </SingleTileSource>
                      <AnnotationCanvasRepresentation
                        ratio={0.1}
                        ratioFromMaxWidth={1000}
                        growthStyle={growthStyle}
                        bemModifiers={annotation => ({
                          selected: state.annotation
                            ? state.annotation.id === annotation.id
                            : null,
                        })}
                        onClickAnnotation={this.onClickAnnotation}
                      />
                      {mobileBreakpoint > window.innerWidth &&
                      state.isMobileFullscreen === false ? (
                        <FullscreenCover
                          toggleFullscreen={this.toggleMobileFullscreen}
                        />
                      ) : null}
                      <FullScreenToggle
                        isFullscreen={
                          fullscreenEnabled
                            ? isFullscreen
                            : state.isMobileFullscreen
                        }
                        toggleFullscreen={
                          fullscreenEnabled
                            ? toggleFullscreen
                            : this.toggleMobileFullscreen
                        }
                        mobileBreakpoint={mobileBreakpoint}
                      />
                      {state.annotation ? (
                        <AnnotationDetail
                          closeText={closeText}
                          annotation={state.annotation}
                          onClose={this.onClose}
                        />
                      ) : null}
                    </AdaptiveViewport>
                  </CanvasProvider>
                </Manifest>
              </Bem>
            </div>
          )}
        </Fullscreen>
      </div>
    );
  }
}

function create(el, userConfiguration) {
  if (!el) {
    console.error(`singleCanvasAnnotationDetailViewer:
      You must provide an 'el' property in the configuration pointing
      to the DOM element you want the viewer to be mounted at.
    `);
    return;
  }

  if (!userConfiguration.manifest && !userConfiguration.jsonLdManifest) {
    console.error(`singleCanvasAnnotationDetailViewer:
      You must provide a URL pointing to a IIIF manifest, by default the first
      canvas will be used, you can pass in a 'canvas' to control which canvas
      should be displayed.
    `);
    return;
  }

  const config = Object.assign({}, defaultConfiguration, userConfiguration);

  ReactDOM.render(<PatchworkPlugin {...config} />, el);
}

const help = function() {
  console.info(`
  singleCanvasAnnotationDetailViewer
  ==================================

  In order to get set up using single canvas annotation detail viewer you must
  provide at least 2 configuration options:
   - el: this is the HTML element to target
   - manifest: this is a link to a IIIF manifest.

   By default the first canvas in the IIIF manifest will be used. You can
   provider a canvas configuration value to change this (index).

   A basic configuration might look like:

   singleCanvasAnnotationDetailViewer.create(document.getElementById('myViewer'), {
      manifest: 'http:// ... /',
   });

   You can see the full set of default configuration values printed below in the
   console.
  `);
  console.log(defaultConfiguration);
};

export { create, help, PatchworkPlugin };
