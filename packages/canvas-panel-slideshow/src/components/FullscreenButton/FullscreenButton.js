import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './FullscreenButton.scss';

class FullscreenButton extends Component {
  render() {
    const {
      bem,
      fullscreenEnabled,
      isFullscreen,
      exitFullscreen,
      goFullscreen,
    } = this.props;

    if (!fullscreenEnabled) {
      return null;
    }

    if (isFullscreen) {
      return (
        <button onClick={exitFullscreen} className={bem.modifier('off')}>
          <svg
            viewBox="28 28 40 40"
            width="100%"
            height="100%"
          >
            <title>exit-fullscreen</title>
            <path
              d="M40.2296858,36.1045504 L33.1224269,29 L29,33.1224269 L36.1045504,40.2296858 L32.3315276,44 L44,44 L44,32.3315276 L40.2296858,36.1045504 Z M55.7703142,59.8954496 L62.8775731,67 L67,62.8775731 L59.8954496,55.7703142 L63.6684724,52 L52,52 L52,63.6684724 L55.7703142,59.8954496 Z"
              fill="currentColor"
              fillRule="nonzero"
            />
          </svg>
        </button>
      );
    }

    return (
      <button onClick={goFullscreen} className={bem.modifier('on')}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <title>fullscreen</title>
          <path
            d="M12.346 22.572l17.619 17.612 10.219-10.22-17.612-17.618L31.925 3H3v28.925l9.346-9.353zm10.226 65.082l17.612-17.619-10.22-10.219-17.618 17.612L3 68.075V97h28.925l-9.353-9.346zm54.856-75.308L59.816 29.965l10.22 10.219 17.618-17.612L97 31.925V3H68.075l9.353 9.346zm10.226 65.082L70.035 59.816l-10.219 10.22 17.612 17.618L68.075 97H97V68.075l-9.346 9.353z"
            fill="currentColor"
            fillRule="nonzero"
          />
        </svg>
      </button>
    );
  }
}

export default withBemClass('fullscreen-btn')(FullscreenButton);
