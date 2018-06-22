import React, { Component } from 'react';
import { LocaleString } from '@canvas-panel/core';

function getLocaleHack(internationalObject) {
  if (!internationalObject) {
    return '';
  }
  if (internationalObject.hasOwnProperty('en')) {
    return internationalObject.en[0];
  } else {
    const keys = Object.keys(internationalObject);
    if (keys.length) {
      return internationalObject[keys[0]][0];
    } else {
      return '';
    }
  }
}

const P3SlideContent = props => {
  const { canvas } = props;
  const { requiredStatement, summary } = canvas.__jsonld;
  const containerCls = 'slide__overlay';
  const label = canvas.getLabel();
  console.log(label);
  return (
    <div className={containerCls}>
      <div className={containerCls + '-content'}>
        {label.length ? (
          <h2 className="slide__title">
            <LocaleString>{label}</LocaleString>
          </h2>
        ) : (
          ''
        )}
        <p
          className="slide__text"
          dangerouslySetInnerHTML={{
            __html: getLocaleHack(summary),
          }}
        />
      </div>
      <div className={containerCls + '-floating'}>
        <p
          className="slide__required-statement"
          dangerouslySetInnerHTML={{
            __html: getLocaleHack(requiredStatement.value),
          }}
        />
      </div>
    </div>
  );
};

export default P3SlideContent;
