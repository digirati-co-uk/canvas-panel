import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Controls.scss';

class Controls extends Component {
  render() {
    const {
      bem,
      onZoomIn,
      onZoomOut,
      isFullscreen,
      onFullscreen,
      fullscreenEnabled = false,
    } = this.props;
    return (
      <nav className={bem.modifiers({ active: true })}>
        <button
          onClick={onZoomIn}
          className={`${bem
            .element('control')
            .modifier('zoom-in')} material-icons`}
        >
          add
        </button>
        <button
          onClick={onZoomOut}
          className={`${bem
            .element('control')
            .modifier('zoom-out')} material-icons`}
        >
          remove
        </button>
        {fullscreenEnabled ? (
          <button
            onClick={onFullscreen}
            className={`${bem
              .element('control')
              .modifier('fullscreen')} material-icons`}
          >
            {isFullscreen ? 'close' : 'fullscreen'}
          </button>
        ) : null}
      </nav>
    );
  }
}

export default withBemClass('viewer-controls')(Controls);
