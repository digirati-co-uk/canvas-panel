import React, { Component } from 'react';

import { withBemClass } from '@canvas-panel/core';
import SlideShow from '../../components/SlideShow';
import LayoutDebugSlideContent from '../../components/LayoutDebugSlideContent';
import P3SlideContent from '../../components/P3SlideContent';

import './SlideShowDemo.scss';

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
              <P3SlideContent />
            </SlideShow>
          </div>
        </section>
        <section className={bem.element('section').modifier('full-width')}>
          <h2 className={bem.element('subtitle')}>Full width SlideShow</h2>
          <p style={{ background: 'white' }}>
            It demonstrates the responsive behaviors and the all possible slide
            layouts using behaviours.
          </p>
          <div className={bem.element('full-width-container')}>
            <SlideShow manifestUri="https://adam-digirati.github.io/balenciaga1-behaviors.json">
              <LayoutDebugSlideContent />
            </SlideShow>
          </div>
        </section>
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
