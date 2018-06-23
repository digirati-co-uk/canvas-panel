import React, { Component } from 'react';

import { withBemClass } from '@canvas-panel/core';
import SlideShow from './components/SlideShow';
import SlideShowConfigurator from './components/SlideShowConfigurator';
//import ExperimentalSlideTransition from './components/ExperimentalSlideTransition';
import LayoutDebugSlideContent from './components/LayoutDebugSlideContent';
import P2SlideContent from './components/P2SlideContent';
import P3SlideContent from './components/P3SlideContent';
import DummySlideContent from './components/DummySlideContent';

import './SlideShowDemo.scss';

class SlideShowDemoBase extends Component {
  render() {
    const currentDomain = window.location.origin;
    let { bem } = this.props;
    return (
      <article className={bem}>
        <h1 className={bem.element('title')}>SlideShow Component</h1>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>Small Inline SlideShow</h2>
          <p>
            The first example is the most basic version of the slideshow
            embedded into a webpage. It also demonstrates the all possible slide
            layouts using behaviours.
          </p>
          <div className={bem.element('inline-container')}>
            <SlideShow
              manifesturi={currentDomain + '/public/balenciaga1-behaviors.json'}
            >
              <LayoutDebugSlideContent />
            </SlideShow>
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
            <SlideShow manifesturi={currentDomain + '/public/balenciaga2.json'}>
              <P3SlideContent />
            </SlideShow>
          </div>
        </section>
        <section className={bem.element('section').modifier('full-width')}>
          <h2 className={bem.element('subtitle')}>Full width SlideShow</h2>
          <p style={{ background: 'white' }}>
            It demonstrates the responsive behaviors and
            IIIF&nbsp;Presentation&nbsp;2.1 backwards compatibility.
          </p>
          <div className={bem.element('full-width-container')}>
            <SlideShow manifesturi="https://view.nls.uk/manifest/8397/83973988/manifest.json" />
          </div>
        </section>
        {/*<section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>Custom Styles</h2>
          <div
            style={{
              width: 1024,
              height: 768,
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <SlideShow
              manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest"
              slideTransitionComponent={ExperimentalSlideTransition}
            />
          </div>
        </section>*/}
        {/*<section className={bem.element('section').modifier('full-width')}>
          <h2 className={bem.element('subtitle')}>Configure Your Own</h2>
          <div
            style={{
              width: '100vw',
              height: 'calc(100vh - 40px)',
              margin: '0 auto',
              position: 'relative',
            }}
          >
            <SlideShowConfigurator>
              <SlideShow manifesturi="https://wellcomelibrary.org/iiif/b18934717/manifest" />
            </SlideShowConfigurator>
          </div>
          </section>*/}
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
