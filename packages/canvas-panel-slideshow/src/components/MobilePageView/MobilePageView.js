import React, { Component } from 'react';
import { withBemClass, StaticImageViewport } from '@canvas-panel/core';
import CanvasDetail from '../CanvasDetail/CanvasDetail';
import './MobilePageView.scss';
import TapDetector from '../TapDetector/TapDetector';
import MobileViewer from '../MobileViewer/MobileViewer';
import FullscreenButton from '../FullscreenButton/FullscreenButton';
import PeekComponent from '../PeekComponent/PeekComponent';

class MobilePageView extends Component {
  state = {
    isFullscreen: false,
    currentCanvas: null,
    offset: 0,
    down: false,
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentIndex !== this.props.currentIndex) {
      this.setState({ offset: 0, open: false });
    }
  }

  onDragStart = () => {
    this.setState({ down: true });
  };
  onDragStop = () => {
    this.setState({ down: false });
  };

  nextRange = () => {
    this.viewport.viewer.viewer.viewport.applyConstraints(true);
    this.props.nextRange();
  };

  previousRange = () => {
    this.viewport.viewer.viewer.viewport.applyConstraints(true);
    this.props.previousRange();
  };

  touchDetector = null;

  setViewport = viewport => {
    if (this.touchDetector) {
      this.touchDetector.unbind();
    }
    this.touchDetector = new TapDetector(viewport.viewer.viewer.canvas);
    this.touchDetector.onTap(this.onTap);
    this.viewport = viewport;
  };

  onTap = () => {
    this.setState(s => ({ open: !s.open }));
  };

  applyOffset = offset => {
    this.setState({ offset });
  };

  onOpen = () => {
    this.setState({ open: true });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  onExitFullscreen = () => {
    this.setState({ isFullscreen: false });
  };

  onEnterFullscreen = canvasIndex => () => {
    this.props.goToRange(canvasIndex);
    this.setState({ isFullscreen: true });
  };

  zoomOut = () => {
    this.viewport.zoomOut();
  };

  zoomIn = () => {
    this.viewport.zoomIn();
  };

  componentDidUpdate(prevProps) {
    // only scroll into view if the active item changed last render
    if (!this.state.isFullscreen) {
      this.ensureActiveItemVisible();
    }
  }

  ensureActiveItemVisible = () => {
    if (this.activeItem) {
      this.activeItem.scrollIntoView();
    }
  };

  setActiveRef = element => {
    this.activeItem = element;
  };

  render() {
    const { isFullscreen, offset, down, open } = this.state;
    const { currentIndex, bem, manifest } = this.props;

    if (isFullscreen) {
      const {
        canvas,
        nextRange,
        previousRange,
        getNextRange,
        getPreviousRange,
      } = this.props;

      const size = manifest.getSequenceByIndex(0).getCanvases().length;

      return (
        <PeekComponent
          down={down}
          customOffset={offset}
          onNext={this.nextRange}
          onPrevious={this.previousRange}
          size={size}
          renderLeft={() => (
            <MobileViewer manifest={manifest} canvas={getPreviousRange()} />
          )}
          renderRight={() => (
            <MobileViewer manifest={manifest} canvas={getNextRange()} />
          )}
          index={currentIndex}
        >
          <MobileViewer
            current
            setViewport={this.setViewport}
            manifest={manifest}
            canvas={canvas}
            onDragStart={this.onDragStart}
            onDragStop={this.onDragStop}
            applyOffset={this.applyOffset}
            onZoomIn={this.zoomIn}
            onZoomOut={this.zoomOut}
            onOpen={this.onOpen}
            onClose={this.onClose}
            onExitFullscreen={this.onExitFullscreen}
            isOpen={open}
            size={size}
            nextRange={nextRange}
            previousRange={previousRange}
          />
        </PeekComponent>
      );
    }

    return (
      <div className={bem}>
        {manifest
          .getSequenceByIndex(0)
          .getCanvases()
          .map((canvas, canvasIndex) => (
            <CanvasDetail
              key={canvas ? canvas.id : canvasIndex}
              canvas={canvas}
            >
              {({ label, body, attributionLabel, attribution }) => (
                <div
                  ref={canvasIndex === currentIndex && this.setActiveRef}
                  className={bem.element('canvas')}
                >
                  <StaticImageViewport
                    className={bem.element('canvas-image')}
                    manifest={manifest}
                    canvas={canvas}
                    maxHeight={200}
                    maxWidth={200}
                  >
                    <FullscreenButton
                      fullscreenEnabled={true}
                      isFullscreen={isFullscreen}
                      goFullscreen={this.onEnterFullscreen(canvasIndex)}
                      exitFullscreen={this.onExitFullscreen}
                    />
                    <div className={bem.element('attribution')}>
                      {attributionLabel} {attribution}
                    </div>
                  </StaticImageViewport>
                  <div className={bem.element('metadata')}>
                    <div className={bem.element('detail')}>
                      <h3 className={bem.element('detail-label')}>{label}</h3>
                      <p className={bem.element('detail-body')}>{body}</p>
                    </div>
                  </div>
                </div>
              )}
            </CanvasDetail>
          ))}
      </div>
    );
  }
}

export default withBemClass('mobile-page-view')(MobilePageView);
