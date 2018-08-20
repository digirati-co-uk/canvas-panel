import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';

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
          Exit fullscreen
        </button>
      );
    }

    return (
      <button onClick={goFullscreen} className={bem.modifier('on')}>
        Fullscreen
      </button>
    );
  }
}

export default withBemClass('fullscreen-btn')(FullscreenButton);
