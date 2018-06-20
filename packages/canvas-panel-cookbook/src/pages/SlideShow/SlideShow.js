import React, { Component } from 'react';
import classNames from 'classnames/bind';
import {
  Manifest,
  CanvasProvider,
  StaticImageViewport,
  CanvasNavigation,
  LocaleString,
  FullPageViewport,
  Fullscreen,
  OpenSeadragonViewport,
  SingleTileSource,
  withBemClass,
} from '@canvas-panel/core';

import './SlideShow.scss';

const ProgressIndicatorBase = props => {
  const { currentCanvas, sequence, bem } = props;
  return (
    <div className={bem}>
      <div className={bem.element('track')}>
        <div
          className={bem.element('value')}
          style={{
            width: (currentCanvas / sequence.getTotalCanvases()) * 100 + '%',
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
                    'slide--even':
                      currentCanvas !== 0 && currentCanvas % 2 === 0,
                    'slide--odd': currentCanvas % 2 !== 0,
                  });
                  return (
                    <div className={slideClasses}>
                      <div className="slide__viewport">
                        <SingleTileSource manifest={manifest} canvas={canvas}>
                          <FullPageViewport
                            position="absolute"
                            interactive={true}
                          >
                            {true ? (
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
                      </div>
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
                      <ProgressIndicator {...{ sequence, currentCanvas }} />
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
