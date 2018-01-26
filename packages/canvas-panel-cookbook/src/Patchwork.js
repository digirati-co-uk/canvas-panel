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
import AnnWest from './Sites/VA/AnnWest';
import './Patchwork.css';

class Patchwork extends Component {
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
      <AnnWest>
        <div className="patchwork-container">
          <Manifest jsonLd={p3manifest}>
            <CanvasProvider>
              <Viewport
                maxWidth={1200}
                maxHeight={500}
                setRef={this.setViewport}
              >
                <SingleTileSource viewportController={true}>
                  <OpenSeadragonViewport>
                    <OpenSeadragonViewer
                      osdOptions={{
                        visibilityRatio: 1,
                        constrainDuringPan: true,
                        showNavigator: false,
                      }}
                    />
                  </OpenSeadragonViewport>
                </SingleTileSource>
                <AnnotationCanvasRepresentation
                  growthStyle="fixed"
                  onClickAnnotation={this.onClickAnnotation}
                  annotationClassName="annotation-pin"
                />
              </Viewport>
            </CanvasProvider>
          </Manifest>
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
      </AnnWest>
    );
  }
}

export default Patchwork;
