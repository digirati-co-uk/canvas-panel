import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ProgressIndicator.scss';

class ProgressIndicator extends Component {
  render() {
    const { currentCanvas, totalCanvases, bem } = this.props;
    const progressPercent = (currentCanvas / (totalCanvases - 1)) * 100;
    return (
      <div className={bem}>
        <div className={bem.element('track')}>
          <div
            className={bem.element('value')}
            style={{
              width: `${progressPercent}%`,
            }}
          />
        </div>
      </div>
    );
  }
}

export default withBemClass('progress-indicator')(ProgressIndicator);
