import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  Viewport,
  SingleTileSource,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  AnnotationDetail,
  AnnotationCanvasRepresentation,
} from '@canvas-panel/core';

import p3manifest from '../../../tests/patchwork';

import './App.css';

class App extends Component {
  viewport = null;
  animationSpeed = 1;
  state = { annotation: null };

  setViewport = viewport => (this.viewport = viewport);

  onClickAnnotation = (annotation, bounds) => {
    this.setState({ annotation });
    this.viewport.goToRect(bounds, 600, this.animationSpeed);
  };

  onClose = () => {
    this.setState({ annotation: null });
    this.viewport.resetView(this.animationSpeed);
  };

  render() {
    const state = this.state;
    return (
      <div style={{ padding: 10 }}>
        <div style={{ width: 800, display: 'inline-block' }}>
          <Manifest jsonLd={p3manifest}>
            <CanvasProvider>
              <Viewport maxWidth={800} setRef={this.setViewport}>
                <SingleTileSource viewportController={true}>
                  <OpenSeadragonViewport>
                    <OpenSeadragonViewer
                      maxHeight={1000}
                      osdOptions={{
                        visibilityRatio: 1,
                        constrainDuringPan: true,
                      }}
                    />
                  </OpenSeadragonViewport>
                </SingleTileSource>
                <AnnotationCanvasRepresentation
                  ratio={0.1}
                  growthStyle="fixed"
                  onClickAnnotation={this.onClickAnnotation}
                  annotationClassName="annotation-pin"
                />
              </Viewport>
            </CanvasProvider>
          </Manifest>
        </div>
        {state.annotation ? (
          <div className="annotation-detail">
            <AnnotationDetail
              closeClassName="annotation-close"
              closeText="&times;"
              annotation={state.annotation}
              onClose={this.onClose}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
