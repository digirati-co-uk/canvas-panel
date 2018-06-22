import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ProgressIndicator.scss';

const ProgressIndicatorBase = props => {
  const { currentCanvas, totalCanvases, bem } = props;
  const progressPrecent = (currentCanvas / (totalCanvases - 1)) * 100;
  return (
    <div className={bem}>
      <div className={bem.element('track')}>
        <div
          className={bem.element('value')}
          style={{
            width: `${progressPrecent}%`,
          }}
        />
      </div>
    </div>
  );
};

const ProgressIndicator = withBemClass('progress-indicator')(
  ProgressIndicatorBase
);

export default ProgressIndicator;
