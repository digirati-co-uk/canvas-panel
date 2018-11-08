import React, { Component } from 'react';
import CanvasDetail from '../CanvasDetail/CanvasDetail';
import {
  withBemClass,
  SingleTileSource,
  OpenSeadragonViewport,
  FullPageViewport,
  Responsive,
} from '@canvas-panel/core';
import './MobileViewer.scss';
import ZoomButtons from '../ZoomButtons/ZoomButtons';
import CanvasNavigation from '../CanvasNavigation/CanvasNavigation';

const ExitFullscreenIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#fff" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const InfoIcon = ({ onClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    onClick={onClick}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
      fill="#fff"
    />
  </svg>
);

const CloseIcon = ({ onClick, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    onClick={onClick}
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

const Attribution = ({ bem, hidden, children }) => (
  <div className={bem.element('attribution').modifiers({ hidden })}>
    {children}
  </div>
);

const ExitFullscreen = ({ bem, hidden, onClick }) => (
  <div
    className={bem.element('exit-fullscreen').modifiers({ hidden })}
    onClick={onClick}
  >
    <ExitFullscreenIcon className={bem.element('exit-fullscreen-icon')} />
    Exit slideshow
  </div>
);

const InfoButton = ({ bem, onClick, hidden }) => (
  <div className={bem.element('info').modifiers({ hidden })} onClick={onClick}>
    <InfoIcon className={bem.element('info-icon')} />
  </div>
);

const Navigation = ({ bem, children }) => (
  <div className={bem.element('navigation')}>{children}</div>
);

const InfoPanel = ({ bem, hidden, onClose, children, label }) => (
  <div
    className={bem.element('info-panel').modifiers({
      hidden,
    })}
    onClick={onClose}
  >
    <CloseIcon className={bem.element('info-panel-close')} />
    <h2>{label}</h2>
    <p>{children}</p>
  </div>
);

class MobileViewer extends Component {
  static defaultProps = {
    applyOffset: () => null,
    setViewport: () => null,
  };

  state = { open: false, constrained: false, offset: 0 };

  onConstrain = (viewer, x, y) => {
    const stateToUpdate = {};
    if (this.props.applyOffset) {
      this.props.applyOffset(-x);
      stateToUpdate.offset = -x;
    }
    stateToUpdate.constrained = true;
    if (y) {
      this.applyConstraints(viewer, true);
    }
    this.setState(stateToUpdate);
  };

  applyConstraints(viewer, immediately) {
    const bounds = viewer.viewport.getBoundsNoRotate();
    const constrainedBounds = viewer.viewport._applyBoundaryConstraints(bounds);

    constrainedBounds.x = bounds.x;
    if (bounds.y !== constrainedBounds.y) {
      viewer.viewport.fitBounds(constrainedBounds, immediately);
    }
  }

  onDragStart = viewer => {
    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
    this.setState({ dragging: true });
  };

  onDragStop = viewer => {
    if (this.props.onDragStop) {
      this.props.onDragStop();
    }
    this.setState({ dragging: false });

    if (this.props.applyOffset) {
      this.props.applyOffset(0);
    }
    this.setState({ constrained: false });
  };

  render() {
    const { dragging } = this.state;
    const {
      current,
      onDragStart,
      onDragStop,
      onClose,
      onExitFullscreen,
      onOpen,
      isOpen,
      bem,
      nextRange,
      previousRange,
      canvasList,
      size,
      onZoomIn,
      onZoomOut,
      ...props
    } = this.props;
    const { canvas, index } = props;

    if (!canvas) {
      return <div />;
    }

    return (
      <CanvasDetail key={canvas.id} canvas={canvas}>
        {({ label, body, attributionLabel, attribution }) => (
          <div className={bem}>
            <div className={bem.element('inner')}>
              <SingleTileSource {...props}>
                {current ? (
                  <Attribution bem={bem} hidden={!current || dragging}>
                    {attributionLabel} {attribution}
                  </Attribution>
                ) : (
                  <React.Fragment />
                )}
                {current ? (
                  <ExitFullscreen
                    bem={bem}
                    onClick={onExitFullscreen}
                    hidden={!current || dragging}
                  />
                ) : (
                  <React.Fragment />
                )}
                {current ? (
                  <InfoButton
                    bem={bem}
                    onClick={onOpen}
                    hidden={!current || dragging}
                  />
                ) : (
                  <React.Fragment />
                )}
                <Navigation bem={bem}>
                  {current ? (
                    <div
                      className={bem
                        .element('zoom-controls')
                        .modifiers({ hidden: !current || dragging })}
                    >
                      <ZoomButtons
                        right
                        onZoomIn={onZoomIn}
                        onZoomOut={onZoomOut}
                      />
                    </div>
                  ) : null}
                  {current ? (
                    <div
                      className={bem
                        .element('canvas-navigation')
                        .modifiers({ hidden: !current || dragging })}
                    >
                      <CanvasNavigation
                        previousRange={previousRange}
                        nextRange={nextRange}
                        size={size}
                        currentIndex={index}
                      />
                    </div>
                  ) : null}
                </Navigation>
                <FullPageViewport
                  setRef={this.props.setViewport}
                  position="absolute"
                  interactive={true}
                  style={{ height: '100%' }}
                  osdOptions={{
                    visibilityRatio: 1,
                    constrainDuringPan: false,
                    showNavigator: false,
                    animationTime: 0.3,
                  }}
                  onConstrain={this.onConstrain}
                >
                  <OpenSeadragonViewport
                    useMaxDimensions={true}
                    interactive={true}
                    onDragStart={this.onDragStart}
                    onDragStop={this.onDragStop}
                    osdOptions={this.osdOptions}
                  />
                </FullPageViewport>
              </SingleTileSource>
            </div>
            {current ? (
              <InfoPanel
                bem={bem}
                hidden={dragging === true || !isOpen}
                onClose={onClose}
                label={label}
              >
                {body}
              </InfoPanel>
            ) : null}
          </div>
        )}
      </CanvasDetail>
    );
  }
}

export default withBemClass('mobile-viewer')(MobileViewer);
