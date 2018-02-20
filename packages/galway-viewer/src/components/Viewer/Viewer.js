import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withBemClass,
  Manifest,
  CanvasProvider,
  SingleTileSource,
  OpenSeadragonViewer,
  OpenSeadragonViewport,
  FullPageViewport,
  AnnotationRepresentation,
} from '@canvas-panel/core';
import './Viewer.scss';
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '../../redux/spaces/manifest';
import Paging from '../Paging/Paging';
import Fullscreen from '../../../../canvas-panel-core/src/components/Fullscreen/Fullscreen';
import AnnotationCanvasRepresentation from '../../../../canvas-panel-core/src/components/AnnotationCanvasRepresentation/AnnotationCanvasRepresentation';
import {
  deselectAnnotation,
  selectAnnotation,
} from '../../redux/spaces/annotations';
import Supplemental from '../Supplemental/Supplemental';

class Controls extends Component {
  render() {
    const { onZoomIn, onZoomOut, isFullscreen, onFullscreen } = this.props;
    return (
      <nav className="controls controls--active">
        <button
          onClick={onZoomIn}
          className="controls__control material-icons control--zoom-in"
        >
          add
        </button>
        <button
          onClick={onZoomOut}
          className="controls__control material-icons control--zoom-out"
        >
          remove
        </button>
        <button
          onClick={onFullscreen}
          className="controls__control material-icons control--fullscreen"
        >
          {isFullscreen ? 'close' : 'fullscreen'}
        </button>
      </nav>
    );
  }
}

class Viewer extends Component {
  setViewport = viewport => (this.viewport = viewport);

  zoomIn = () => {
    if (this.viewport) {
      this.viewport.zoomIn();
    }
  };

  zoomOut = () => {
    if (this.viewport) {
      this.viewport.zoomOut();
    }
  };

  render() {
    const {
      bem,
      manifest,
      isLoaded,
      isPending,
      error,
      currentCanvas,
      annotations,
      dispatch,
      currentAnnotation,
      currentAnnotationData,
      search,
    } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!isLoaded || isPending) {
      return <div>loading...</div>;
    }

    return (
      <Fullscreen>
        {({ isFullscreen, exitFullscreen, goFullscreen }) => (
          <div className={bem} style={{ width: '100%' }}>
            <div className="galway-paging">Page 001 of 175</div>

            <Controls
              onZoomIn={this.zoomIn}
              onZoomOut={this.zoomOut}
              isFullscreen={isFullscreen}
              onFullscreen={isFullscreen ? exitFullscreen : goFullscreen}
            />

            <Manifest jsonLd={manifest}>
              <CanvasProvider startCanvas={2} currentCanvas={currentCanvas}>
                {props => (
                  <div>
                    <Paging canvas={props.canvas} />
                    <div className={bem.element('osd')}>
                      <FullPageViewport
                        interactive={true}
                        position="relative"
                        setRef={this.setViewport}
                        {...props}
                      >
                        <SingleTileSource viewportController={true}>
                          <OpenSeadragonViewport viewportController={true}>
                            <OpenSeadragonViewer
                              useMaxDimensions={true}
                              osdOptions={{
                                visibilityRatio: 1,
                                constrainDuringPan: true,
                                showNavigator: false,
                              }}
                            />
                          </OpenSeadragonViewport>
                        </SingleTileSource>
                        {search &&
                        search.currentQuery &&
                        search.isLoading === false ? (
                          <AnnotationRepresentation
                            annotations={search.annotations || []}
                            ratio={0.1}
                            growthStyle="fixed"
                          />
                        ) : (
                          <AnnotationRepresentation
                            annotations={annotations || []}
                            ratio={0.1}
                            growthStyle="fixed"
                            bemModifiers={annotation => ({
                              selected:
                                annotation.id &&
                                annotation.id === currentAnnotation,
                            })}
                            onClickAnnotation={annotation =>
                              dispatch(
                                selectAnnotation(annotation.id, 'otherContent')
                              )
                            }
                          />
                        )}
                      </FullPageViewport>
                    </div>
                  </div>
                )}
              </CanvasProvider>
            </Manifest>
          </div>
        )}
      </Fullscreen>
    );
  }
}

function mapSearchState(state, currentCanvas) {
  const searchState = state.search;
  if (!searchState) {
    return null;
  }
  const { currentQuery, isLoading, queries, error } = searchState;
  const currentQueryResults = queries[currentQuery];

  return {
    currentQuery,
    isLoading,
    error,
    currentQueryResults,
    annotations:
      currentQueryResults && currentQueryResults.canvasMap
        ? currentQueryResults.canvasMap[currentCanvas.id] || []
        : [],
  };
}

function mapStateToProps(state) {
  const currentCanvasIndex = state.manifest.currentCanvas;
  const currentCanvas = state.manifest.manifesto
    ? state.manifest.manifesto
        .getSequenceByIndex(0)
        .getCanvasByIndex(currentCanvasIndex)
    : null;
  const annotationIds = currentCanvas
    ? state.annotations.canvasMap[currentCanvas.id]
    : null;
  const search = mapSearchState(state, currentCanvas);

  return {
    search,
    isLoaded: !!state.manifest.currentManifest,
    manifest: state.manifest.jsonLd,
    isPending: state.manifest.isPending,
    error: state.manifest.errorMessage,
    currentCanvas: state.manifest.currentCanvas,
    currentAnnotation: state.annotations.selected.id,
    currentAnnotationData: state.annotations.selected.id
      ? state.annotations.index[state.annotations.selected.id]
      : null,
    annotationIds,
    annotations: annotationIds
      ? annotationIds.map(id => state.annotations.index[id])
      : [],
  };
}

export default connect(mapStateToProps)(withBemClass('viewer')(Viewer));
