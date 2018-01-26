import React, { Component } from 'react';
import Measure from 'react-measure';
import {
  Manifest,
  CanvasProvider,
  Viewport,
  SingleTileSource,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  AnnotationDetail,
  AnnotationCanvasRepresentation,
  AnnotationListProvider,
  AnnotationProvider,
  functionOrMapChildren,
} from '@canvas-panel/core';
import './FullPagePatchwork.css';

class FullPageViewport extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1,
    },
  };

  render() {
    const { osdOptions, ...props } = this.props;
    const { width, height } = this.state.dimensions;
    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div
            ref={measureRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 0,
              pointerEvents: 'none',
            }}
          >
            <Viewport maxHeight={height} maxWidth={width} {...props}>
              {this.props.children}
            </Viewport>
          </div>
        )}
      </Measure>
    );
  }
}

class Container extends Component {
  lastScrollY = -1;
  scheduledAnimationFrame = false;

  state = { current: 0 };

  static defaultProps = {
    windowHeight: window.innerHeight,
  };

  componentWillMount() {
    const current = ~~(this.lastScrollY / this.props.windowHeight);
    console.log(current);
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
    const current = ~~(this.lastScrollY / this.props.windowHeight);
    if (current !== this.state.current) {
      this.setState(() => ({
        current,
      }));
    }
  };

  render() {
    const { children, ...props } = this.props;
    const { current } = this.state;

    return (
      <div
        style={{
          zIndex: 1,
          position: 'relative',
        }}
      >
        {functionOrMapChildren(children, { ...props, current })}
      </div>
    );
  }
}

class TitlePanel extends Component {
  render() {
    return (
      <div className="title-panel">
        <div
          style={{
            color: '#fff',
            fontWeight: 300,
            padding: 30,
            margin: 'auto',
            textAlign: 'center',
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

class PagePanel extends Component {
  render() {
    return (
      <div style={{ width: '500px', height: '100vh' }}>
        <div
          style={{
            background: '#fff',
            padding: 30,
            marginLeft: 40,
            boxShadow: '0px 10px 40px 0px rgba(0,0,0,.1)',
          }}
        >
          {this.props.children}
        </div>
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
        <Manifest jsonLd={require('../../../tests/patchwork')}>
          <CanvasProvider>
            <FullPageViewport setRef={this.setViewport}>
              <SingleTileSource viewportController={true}>
                <OpenSeadragonViewport>
                  <OpenSeadragonViewer
                    osdOptions={{
                      immediateRender: false,
                    }}
                  />
                </OpenSeadragonViewport>
              </SingleTileSource>
            </FullPageViewport>
            <Container>
              <TitlePanel>
                <h1>Patchwork</h1>
                <p>scroll demo</p>
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
