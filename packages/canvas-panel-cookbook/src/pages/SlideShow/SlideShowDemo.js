import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { SlideShow } from '@canvas-panel/slideshow';

import './SlideShowDemo.scss';
import inlineJsonExample from './inline.json';

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
            <SlideShow manifestUri="https://view.nls.uk/manifest/8397/83973988/manifest.json" />
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
            </a>
            &nbsp;of the viewer using a IIIF Presentation 3 manifest.
          </p>
          <div className={bem.element('inline-container')}>
            <SlideShow manifestUri="https://raw.githubusercontent.com/4d4mm/adam-digirati.github.io/master/balenciaga4.json" />
          </div>
        </section>
        <section className={bem.element('section').modifier('full-width')}>
          <h2 className={bem.element('subtitle')}>Full width SlideShow</h2>
          <p style={{ background: 'white' }}>
            It demonstrates the responsive behaviors and the all possible slide
            layouts using behaviours.
          </p>
          <div className={bem.element('full-width-container')}>
            <SlideShow manifestUri="https://raw.githubusercontent.com/4d4mm/adam-digirati.github.io/master/balenciaga1-behaviors.json" />
          </div>
        </section>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>
            Slideshow with inline json
          </h2>
          <p style={{ background: 'white' }}>
            Slideshow allows to pass a jsonld directly. It is useful if the host
            application uses the same manifest json somewhere else - it does not
            need to be downloaded multiple times.
          </p>
          <div className={bem.element('inline-container')}>
            <SlideShow jsonLd={inlineJsonExample} />
          </div>
        </section>
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
