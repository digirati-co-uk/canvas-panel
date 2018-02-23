import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import cookie from 'cookies-js';
import './StartScreen.scss';

class StartScreen extends Component {
  static COOKIE_NAME = 'galway-viewer-intro';

  cookie = cookie;
  hasCookieBoolean = cookie.get(StartScreen.COOKIE_NAME) === 'true';
  state = {
    hidden: this.hasCookieBoolean,
  };

  pressEscape = e => (e.keyCode === 27 ? this.closeStartScreen() : null);

  componentDidMount() {
    document.addEventListener('keydown', this.pressEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.pressEscape);
  }

  toggleStartScreen() {
    this.setState({ hidden: !this.state.hidden });
  }

  openStartScreen() {
    this.setState({ hidden: false });
  }

  closeStartScreen = () => {
    this.setState({ hidden: true });
    if (this.hasCookie() === false) {
      this.setCookie();
    }
  };

  setCookie() {
    this.cookie.set(StartScreen.COOKIE_NAME, 'true', { expires: Infinity });
  }

  hasCookie() {
    return this.hasCookieBoolean;
  }

  render() {
    const { hidden } = this.state;
    const { bem } = this.props;

    return (
      <section className={bem.modifiers({ hidden })}>
        <div
          className={bem.element('dismiss').modifier('lightbox')}
          onClick={this.closeStartScreen}
        />
        <div className={bem.element('inner')}>
          <div
            className={bem.element('dismiss').modifier('close')}
            onClick={this.closeStartScreen}
          >
            &times;
          </div>
          <div className={bem.element('title')}>
            O'Shaughnessy's Memoir "Engineering Experiences: From Honolulu to
            Hetch Hetchy"
          </div>
          <div className={bem.element('body')}>
            <div className={bem.element('content')}>
              <p>
                Navigate the O'Shaughnessy's memoir by using the timeline (at
                the top) or by paging (next or previous). The timeline is
                categorised by key sections of the memoir.
              </p>
              <p>
                Pages have links that display additional contextual information
                from the digital archive.
              </p>
              <p>
                This memoir presents a digitised copy of O'Shaughnessy's
                unpublished memoir, Engineering Experiences: From Honolulu to
                Hetch Hetchy which describes his life from childhood until 1912,
                shortly before his appointment as City Engineer of San
                Francisco.
              </p>
              <p>
                This work follows the specifications of the{' '}
                <a target="_blank" href="http://iiif.io">
                  International Image Interoperability Framework (IIIF)
                </a>, with a new and innovative timeline navigation application.
                The IIIF suite of specifications facilitates interoperability
                between applications that serve, display, and manipulate images.
                IIIF helps further sharing of images between cultural heritage
                institutions who provide access to complementary digital
                resources.
              </p>
              <p>
                This version of the 'Galway Viewer' is a beta version, released
                11 October 2017. Issues can be logged at
                <a
                  target="_blank"
                  href="https://github.com/digirati-co-uk/nui-galway-viewer/issues"
                >
                  GitHub
                </a>{' '}
                or by contacting the{' '}
                <a href="mailto:digitallibrary@nuigalway.ie">
                  Digital Publishing and Innovation team
                </a>
                at the NUI Galway Library.
              </p>
            </div>
            <div className={bem.element('image')}>
              <img
                src="https://iiif.library.nuigalway.ie/loris/p135/memoir-callouts/p135_4_8.tif/full/!500,500/0/default.jpg"
                alt=""
              />
              <div
                className={bem.element('dismiss').modifier('start')}
                onClick={this.closeStartScreen}
              >
                Start
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withBemClass('start-screen')(StartScreen);
