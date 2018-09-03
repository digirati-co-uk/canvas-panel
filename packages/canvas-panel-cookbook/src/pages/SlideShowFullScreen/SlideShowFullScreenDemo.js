import React, { Component } from 'react';

import { withBemClass } from '@canvas-panel/core';
import SlideShow from '../../components/Slideshow/SlideShow';

import './SlideShowFullScreenDemo.scss';
import AnnotationDetail from '../../../../canvas-panel-core/src/components/AnnotationDetail/AnnotationDetail';

class SlideShowDemoBase extends Component {
  render() {
    let { bem } = this.props;
    return (
      <article className={bem}>
        <div className={bem.element('full-width-container')}>
          <SlideShow manifesturi="https://adam-digirati.github.io/balenciaga4.json">
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
