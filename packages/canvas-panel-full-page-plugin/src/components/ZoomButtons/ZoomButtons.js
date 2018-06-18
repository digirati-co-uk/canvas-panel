import React, { Component } from 'react';
import './ZoomButtons.scss';
import { withBemClass } from '@canvas-panel/core';

class ZoomButtons extends Component {
  render() {
    const { bem, onZoomIn, onZoomOut } = this.props;

    return (
      <div className={bem}>
        <button
          className={bem.element('button').modifiers('in')}
          onClick={onZoomIn}
        >
          +
        </button>
        <button
          className={bem.element('button').modifiers('out')}
          onClick={onZoomOut}
        >
          –
        </button>
      </div>
    );
  }
}

export default withBemClass('zoom-buttons')(ZoomButtons);
