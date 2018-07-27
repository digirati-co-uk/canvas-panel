import React, { Component } from 'react';
import { lipsumN } from '../utils';

const demoData = {
  label: 'Demo label',
  description: lipsumN(2).join('\n'),
  requiredStatement: 'Lorem Ipsum',
  containerCls: 'slide__overlay',
};

const DummySlideContent = props => {
  const { label, description, requiredStatement, containerCls } = demoData;
  const descriptionLines = (description || '')
    .split(/\n+/g)
    .map((line, idx) => (
      <p key={'description_' + idx} className="slide__text">
        {line}
      </p>
    ));
  return (
    <div className={containerCls}>
      <div className={containerCls + '-content'}>
        <h2 className="slide__title">{label}</h2>
        {descriptionLines}
      </div>
      <div className={containerCls + '-floating'}>
        <p className="slide__required-statement">{requiredStatement}</p>
      </div>
    </div>
  );
};

export default DummySlideContent;
