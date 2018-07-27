import React, { Component } from 'react';
import './LayoutDebugSlideContent.scss';
const P2SlideContent = props => {
  const containerCls = 'slide__overlay';
  return (
    <div className={containerCls}>
      <div className={containerCls + '-content'}>
        <h2 className="slide__title">[label]</h2>
        <p>[summary(P3)/description(P2)]</p>
        <p>
          <span className="layout-indicator">Layout: </span>
          <br />
          <span className="info-position-indicator">Info Position: </span>
        </p>
      </div>
      <div className={containerCls + '-floating'}>
        <p className="slide__required-statement">
          [requiredStatement(P3)/attribution(P2)]
        </p>
      </div>
    </div>
  );
};

export default P2SlideContent;
