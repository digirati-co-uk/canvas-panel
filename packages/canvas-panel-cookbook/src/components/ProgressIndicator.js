import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ProgressIndicator.scss';

const ProgressIndicator = props => {
  const { currentCanvas, totalCanvases } = props;
  const progressPrecent = (currentCanvas / (totalCanvases - 1)) * 100;
  return (
    <div className="progress-indicator">
      <div className="progress-indicator__track">
        <div
          className="progress-indicator__value"
          style={{
            width: `${progressPrecent}%`,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressIndicator;
