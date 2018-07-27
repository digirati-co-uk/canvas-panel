import React, { Component } from 'react';

const P2SlideContent = props => {
  const { canvas } = props;
  const { label, description, attribution } = canvas.__jsonld;
  const containerCls = 'slide__overlay';
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
        {label ? <h2 className="slide__title">{label}</h2> : ''}
        {descriptionLines}
      </div>
      <div className={containerCls + '-floating'}>
        <p className="slide__required-statement">{attribution}</p>
      </div>
    </div>
  );
};

export default P2SlideContent;
