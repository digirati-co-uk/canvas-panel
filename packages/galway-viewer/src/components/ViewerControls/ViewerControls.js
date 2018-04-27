import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ViewerControls.scss';

class Controls extends Component {
  render() {
    const { bem, onZoomIn, onZoomOut, isFullscreen, onFullscreen } = this.props;
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
        <button
          onClick={onFullscreen}
          className={`${bem
            .element('control')
            .modifier('fullscreen')} material-icons`}
        >
          {isFullscreen ? 'close' : 'fullscreen'}
        </button>
      </nav>
    );
  }
}

export default withBemClass('viewer-controls')(Controls);
