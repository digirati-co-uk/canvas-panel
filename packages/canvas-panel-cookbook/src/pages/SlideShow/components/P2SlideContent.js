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
      <h2 className="slide__title">{label}</h2>
      {descriptionLines}
      <p className="slide__text">{attribution}</p>
    </div>
  );
};

export default P2SlideContent;
