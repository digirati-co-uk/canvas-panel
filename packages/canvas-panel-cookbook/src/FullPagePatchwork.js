import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  SingleTileSource,
  OpenSeadragonViewport,
  AnnotationDetail,
  AnnotationListProvider,
  AnnotationProvider,
  FullPageViewport,
  functionOrMapChildren,
} from '@canvas-panel/core';
import BezierEasing from 'bezier-easing';

import './FullPagePatchwork.css';

class Container extends Component {
  lastScrollY = -1;
  scheduledAnimationFrame = false;

  state = { current: 0 };

  static defaultProps = {
    windowHeight: window.innerHeight,
  };

  componentWillMount() {
    // Double tilde quicker than Math.floor, useful for scroll events.
    const current = ~~(this.lastScrollY / this.props.windowHeight);
    this.setState(() => ({ current }));
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollThrottled);
    setTimeout(() => {
      this.props.updateIndividual(window.scrollY / this.props.windowHeight);
    }, 500);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollThrottled);
  }

  handleScrollThrottled = () => {
    // Store the scroll value for later.
    this.lastScrollY = window.scrollY;

    // Prevent multiple rAF callbacks.
    if (this.scheduledAnimationFrame) {
      return;
    }

    this.scheduledAnimationFrame = true;
    requestAnimationFrame(this.handleScroll);
  };

  handleScroll = () => {
    this.scheduledAnimationFrame = false;
    // Double tilde quicker than Math.floor, useful for scroll events.
    const current = ~~(this.lastScrollY / this.props.windowHeight);
    this.props.updateIndividual(this.lastScrollY / this.props.windowHeight);
    if (current !== this.state.current) {
      this.setState(() => ({
        current,
      }));
    }
  };

  render() {
    const { children, style, ...props } = this.props;
    const { current } = this.state;

    return (
      <div className="full-page-container" style={style}>
        {functionOrMapChildren(children, { ...props, current })}
      </div>
    );
  }
}

class TitlePanel extends Component {
  render() {
    const { style } = this.props;
    return (
      <div className="title-panel" style={style}>
        <div className="title-panel__inner">{this.props.children}</div>
      </div>
    );
  }
}

class PagePanel extends Component {
  render() {
    const { style } = this.props;
    return (
      <div className="page-panel" style={style}>
        <div className="page-panel__inner">{this.props.children}</div>
      </div>
    );
  }
}

class AnnotationListView extends Component {
  static defaultProps = {
    offset: 0,
    animationFramePadding: 600,
    animationSpeed: 1, // seconds
  };

  componentWillMount() {
    this.props.setUpdater(this.update);
    this.updateView(this.props);
    this.ease = BezierEasing(0.6, 0.02, 0.0, 0.75);
    this.tweens = this.props.annotations.reduce(
      ({ prev, list = [] }, next) => {
        return {
          prev: next.on.selector,
          list: [...list, { from: prev, to: next.on.selector }],
        };
      },
      {
        prev: {
          x: 0,
          y: 0,
          width: this.props.width,
          height: this.props.height,
        },
      }
    );
  }

  update = n => {
    const t = this.tweens.list[~~n];
    if (t) {
      this.props.viewport.goToRect(
        {
          x: t.from.x + (t.to.x - t.from.x) * this.ease(n - ~~n),
          y: t.from.y + (t.to.y - t.from.y) * this.ease(n - ~~n),
          width:
            t.from.width + (t.to.width - t.from.width) * this.ease(n - ~~n),
          height:
            t.from.height + (t.to.height - t.from.height) * this.ease(n - ~~n),
        },
        this.props.animationFramePadding,
        1
      );
    }
  };

  componentWillReceiveProps(newProps) {
    if (newProps.viewport && newProps.current !== this.props.current) {
      this.updateView(newProps);
    }
  }

  updateView(newProps) {
    if (newProps.current < newProps.offset) {
      newProps.viewport.resetView(this.props.animationSpeed);
    }
  }

  render() {
    const { annotations, style } = this.props;

    return (annotations || []).map(({ annotation, on }, key) => (
      <PagePanel key={key} style={style}>
        <AnnotationDetail annotation={annotation} />
      </PagePanel>
    ));
  }
}

class FullPagePatchwork extends Component {
  state = { viewport: null, updater: false, interactive: false };

  setViewport = viewport => {
    this.setState({ viewport });
  };

  updateIndividual = n => {
    if (this.updateIndividualFunc) {
      this.updateIndividualFunc(n);
    }
  };

  setUpdater = updater => {
    this.setState({ updater: true });
    this.updateIndividualFunc = updater;
  };

  toggleInteractive = () => {
    if (this.state.interactive === true) {
      this.updateIndividualFunc(window.scrollY / window.innerHeight);
    } else {
      this.state.viewport.zoomOut(0.5);
    }
    this.setState({
      interactive: !this.state.interactive,
    });
  };

  render() {
    return (
      <div>
        <Manifest url="https://iiif.vam.ac.uk/collections-public/O1023003/manifest.json">
          <CanvasProvider>
            <button
              style={{
                position: 'fixed',
                bottom: 100,
                left: '50%',
                zIndex: 10000,
                lineHeight: '40px',
                fontSize: 18,
                marginLeft: -100,
                width: 200,
                background: '#fff',
                border: 'none',
              }}
              onClick={this.toggleInteractive}
            >
              {this.state.interactive ? 'Back to tour' : 'Explore'}
            </button>
            <FullPageViewport
              setRef={this.setViewport}
              interactive={this.state.interactive}
            >
              <SingleTileSource viewportController={true}>
                <OpenSeadragonViewport
                  osdOptions={{
                    immediateRender: false,
                    showNavigator: false,
                  }}
                />
              </SingleTileSource>
            </FullPageViewport>
            <Container
              updateIndividual={this.updateIndividual}
              updater={this.state.updater}
              style={{
                pointerEvents: this.state.interactive ? 'none' : 'visible',
              }}
            >
              <TitlePanel
                style={{
                  opacity: this.state.interactive ? 0 : 1,
                  transition: 'all .5s',
                }}
              >
                <h1>Ocean Liners</h1>
                <p>scroll demo</p>
                <span className="muted">
                  © Victoria and Albert Museum, London 2018
                </span>
              </TitlePanel>
              <AnnotationListProvider>
                <AnnotationProvider>
                  <AnnotationListView
                    setUpdater={this.setUpdater}
                    offset={1}
                    viewport={this.state.viewport}
                    style={{
                      opacity: this.state.interactive ? 0.3 : 1,
                      transition: 'all .5s',
                      transform: this.state.interactive
                        ? 'translateX(-25%)'
                        : 'translateX(0)',
                    }}
                  />
                </AnnotationProvider>
              </AnnotationListProvider>
            </Container>
          </CanvasProvider>
        </Manifest>
      </div>
    );
  }
}

export default FullPagePatchwork;
