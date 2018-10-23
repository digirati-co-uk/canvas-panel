import React, { Component } from 'react';
import './ZoomButtons.scss';
import { Responsive, withBemClass } from '@canvas-panel/core';

class ZoomButtons extends Component {
  render() {
    const { bem, style, onZoomIn, onZoomOut } = this.props;

    return (
      <div
        className={bem.modifiers({
          mobile: Responsive.isMobile(),
        })}
        style={style}
      >
        <button
          className={bem.element('button').modifier('in')}
          onClick={onZoomIn}
        >
          <svg
            viewBox="0 0 400 400"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M-1-1h582v402H-1z" />
            <g>
              <ellipse ry="200" rx="200" cy="200.413" cx="200" fill="#fff" />
              <ellipse rx="100" ry="100" cy="36" cx="943.5" fill="#fff" />
              <path
                d="M100 200h200M200 100v200"
                fill="none"
                stroke="#000"
                strokeWidth="20"
              />
            </g>
          </svg>
        </button>
        <button
          className={bem.element('button').modifier('out')}
          onClick={onZoomOut}
        >
          <svg
            viewBox="0 0 400 400"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M-1-1h582v402H-1z" />
            <g>
              <ellipse ry="200" rx="200" cy="200.413" cx="200" fill="#fff" />
              <ellipse rx="100" ry="100" cy="36" cx="943.5" fill="#fff" />
              <path
                d="M100 200h200M200 300"
                fill="none"
                stroke="#000"
                strokeWidth="20"
              />
            </g>
          </svg>
        </button>
      </div>
    );
  }
}

export default withBemClass('zoom-buttons')(ZoomButtons);
