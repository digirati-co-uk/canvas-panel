import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  SingleTileSource,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  AnnotationDetail,
  AnnotationListProvider,
  AnnotationProvider,
  FullPageViewport,
  functionOrMapChildren,
} from '@canvas-panel/core';

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
    return (
      <div className="title-panel">
        <div className="title-panel__inner">{this.props.children}</div>
      </div>
    );
  }
}

class PagePanel extends Component {
  render() {
    return (
      <div className="page-panel">
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
    this.updateView(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.viewport && newProps.current !== this.props.current) {
      this.updateView(newProps);
    }
  }

  updateView(newProps) {
    if (newProps.current < newProps.offset) {
      newProps.viewport.resetView(this.props.animationSpeed);
      return;
    }

    if (newProps.annotations[newProps.current - newProps.offset]) {
      const on = newProps.annotations[newProps.current - newProps.offset].on;
      newProps.viewport.goToRect(
        on.selector,
        this.props.animationFramePadding,
        this.props.animationSpeed
      );
    }
  }

  render() {
    const { annotations } = this.props;

    return (annotations || []).map(({ annotation, on }, key) => (
      <PagePanel key={key}>
        <AnnotationDetail annotation={annotation} />
      </PagePanel>
    ));
  }
}

class FullPagePatchwork extends Component {
  state = { viewport: null };

  setViewport = viewport => {
    this.setState({ viewport });
  };

  render() {
    return (
      <div>
        <Manifest url="https://stephenwf.github.io/ocean-liners.json">
          <CanvasProvider>
            <FullPageViewport setRef={this.setViewport}>
              <SingleTileSource viewportController={true}>
                <OpenSeadragonViewport
                  osdOptions={{
                    immediateRender: false,
                  }}
                />
              </SingleTileSource>
            </FullPageViewport>
            <Container>
              <TitlePanel>
                <h1>Ocean Liners</h1>
                <p>scroll demo</p>
                <span className="muted">
                  © Victoria and Albert Museum, London 2018
                </span>
              </TitlePanel>
              <AnnotationListProvider>
                <AnnotationProvider>
                  <AnnotationListView
                    offset={1}
                    viewport={this.state.viewport}
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
