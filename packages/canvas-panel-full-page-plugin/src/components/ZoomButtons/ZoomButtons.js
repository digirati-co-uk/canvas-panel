import React, { Component } from 'react';
import './ZoomButtons.scss';
import { Responsive, withBemClass } from '@canvas-panel/core';

class ZoomButtons extends Component {
  render() {
    const { bem, onZoomIn, onZoomOut } = this.props;

    return (
      <div
        className={bem.modifiers({
          mobile: Responsive.isMobile(),
        })}
      >
        <button
          className={bem.element('button').modifier('in')}
          onClick={onZoomIn}
        >
          +
        </button>
        <button
          className={bem.element('button').modifier('out')}
          onClick={onZoomOut}
        >
          –
        </button>
      </div>
    );
  }
}

export default withBemClass('zoom-buttons')(ZoomButtons);
