import React, { Component } from 'react';

import {
  Manifest,
  CanvasProvider,
  Viewport,
  SingleTileSource,
  OpenSeadragonViewport,
  SizedViewport,
  functionOrMapChildren,
  AnnotationDetail,
} from '@canvas-panel/core';
import AnnotationListProvider from '../../canvas-panel-core/src/manifesto/AnnotationListProvider/AnnotationListProvider';
import AnnotationProvider from '../../canvas-panel-core/src/manifesto/AnnotationProvider/AnnotationProvider';

// Height: 500px -> 80vh -> 80vh
// Width: container -> full -> full
// Pointer: none -> none -> all

const DEFAULT_VIEW = 'DEFAULT_POSITION';
const OPEN_VIEW = 'OPEN_VIEW';
const INTERACTIVE_VIEW = 'INTERACTIVE_VIEW';

class PopOutViewport extends Component {
  static views = {
    [DEFAULT_VIEW]: {
      height: 500,
      width: '100%',
      transition: 'all .2s',
      pointerEvents: 'none',
    },
    [OPEN_VIEW]: {
      width: '100%',
      height: '80vh',
      transition: 'all .2s',
      pointerEvents: 'initial',
    },
    [INTERACTIVE_VIEW]: {
      width: '100%',
      height: '80vh',
      transition: 'all .2s',
      pointerEvents: 'initial',
    },
  };

  static defaultProps = {
    windowHeight: window.innerHeight,
  };

  state = {
    currentView: DEFAULT_VIEW,
    isAtTop: true,
  };

  lastScrollY = 0;

  componentWillMount() {
    this.setState({ isAtTop: window.scrollY < 100 });
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
    const isAtTop = this.lastScrollY < 100; // 50 = threshold
    if (isAtTop === false && this.state.currentView !== DEFAULT_VIEW) {
      this.setState(() => ({
        currentView: DEFAULT_VIEW,
      }));
    }
  };

  handleClick = () => {
    if (this.state.currentView === DEFAULT_VIEW) {
      return this.setState({ currentView: OPEN_VIEW });
    }
    if (this.state.currentView === OPEN_VIEW) {
      return this.setState({ currentView: INTERACTIVE_VIEW });
    }
  };
  onClose = () => this.setState({ currentView: DEFAULT_VIEW });
  setViewport = viewport => this.setState({ viewport });
  setPosition = position => {
    if (position.isZoomedOut && this.state.currentView === INTERACTIVE_VIEW) {
      this.setState({ currentView: DEFAULT_VIEW });
    }
    if (
      position.isZoomedOut === false &&
      this.state.currentView === OPEN_VIEW
    ) {
      this.setState({ currentView: INTERACTIVE_VIEW });
    }
  };

  render() {
    const { currentView } = this.state;
    const { children, ...props } = this.props;
    return (
      <div>
        <button style={{ pointerEvents: 'initial' }} onClick={this.onClose}>
          Close
        </button>
        <div onClick={this.handleClick}>
          <div style={PopOutViewport.views[currentView]}>
            <SizedViewport
              style={{ width: '100%', height: '100%' }}
              setRef={this.setViewport}
              onUpdateViewport={this.setPosition}
            >
              {functionOrMapChildren(children, {
                ...props,
                height: PopOutViewport.views[currentView].height,
              })}
            </SizedViewport>
          </div>
        </div>
      </div>
    );
  }
}

class PopOut extends Component {
  render() {
    return (
      <div style={{ maxWidth: 900, margin: 'auto' }}>
        <h1>Zoom in example</h1>
        <Manifest url="https://iiif.vam.ac.uk/collections-public/O1023003/manifest.json">
          <CanvasProvider>
            <PopOutViewport>
              <SingleTileSource viewportController={true}>
                <OpenSeadragonViewport
                  maxHeight={500}
                  useMaxDimensions={true}
                  osdOptions={{
                    visibilityRatio: 1,
                    constrainDuringPan: true,
                    showNavigator: false,
                  }}
                />
              </SingleTileSource>
            </PopOutViewport>
            <AnnotationListProvider>
              <AnnotationProvider>
                {({ annotations }) =>
                  annotations.map(({ annotation, on }, key) => (
                    <div key={key} style={{ marginBottom: 40 }}>
                      <AnnotationDetail annotation={annotation} />
                    </div>
                  ))
                }
              </AnnotationProvider>
            </AnnotationListProvider>
          </CanvasProvider>
        </Manifest>
      </div>
    );
  }
}

export default PopOut;
