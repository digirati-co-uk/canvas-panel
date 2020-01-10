import React, { Component } from 'react';

import { withBemClass, AnnotationDetail } from '@canvas-panel/core';
import { SlideShow } from '@canvas-panel/slideshow';
import './SlideShowFullScreenDemo.scss';

class SlideShowDemoBase extends Component {
  render() {
    let { bem } = this.props;
    return (
      <article className={bem}>
        <div className={bem.element('full-width-container')}>
          <SlideShow manifesturi="https://raw.githubusercontent.com/4d4mm/adam-digirati.github.io/master/balenciaga4.json">
            <AnnotationDetail />
          </SlideShow>
        </div>
      </article>
    );
  }
}

const SlideShowFullScreenDemo = withBemClass('slideshow-demo')(
  SlideShowDemoBase
);

export default SlideShowFullScreenDemo;
