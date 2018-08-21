import React, { Component } from 'react';

import { withBemClass } from '@canvas-panel/core';
import SlideShow from '../../components/Slideshow/SlideShow';

import './SlideShowDemo.scss';
import AnnotationDetail from '../../../../canvas-panel-core/src/components/AnnotationDetail/AnnotationDetail';

class SlideShowDemoBase extends Component {
  render() {
    let { bem } = this.props;
    return (
      <article className={bem}>
        <h1 className={bem.element('title')}>SlideShow Component</h1>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>Small Inline SlideShow</h2>
          <p>
            The first example is the most basic version of the slideshow
            embedded into a webpage. IIIF&nbsp;Presentation&nbsp;2.1 backwards
            compatibility.
          </p>
          <div className={bem.element('inline-container')}>
            <SlideShow manifestUri="https://stephenwf.github.io/va-example.json" />
          </div>
        </section>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>
            V&amp;A Museum - Balenciaga Collection
          </h2>
          <p>
            The example aims to replicate&nbsp;
            <a
              href="https://artsandculture.google.com/exhibit/-wIivb9hDv4rJQ"
              target="_blank"
            >
              the older version
            </a>&nbsp;of the viewer using a IIIF Presentation 3 manifest.
          </p>
          <div className={bem.element('inline-container')}>
            <SlideShow manifestUri="https://adam-digirati.github.io/balenciaga4.json">
              <AnnotationDetail />
            </SlideShow>
          </div>
        </section>
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
