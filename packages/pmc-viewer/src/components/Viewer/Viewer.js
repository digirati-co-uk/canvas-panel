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
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '@canvas-panel/redux/es/spaces/manifest';
import './Viewer.scss';

class Viewer extends Component {
  setViewport = viewport => {
    this.viewport = viewport;
    if (this.props.setViewport) {
      this.props.setViewport(viewport);
    }
  };

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

  pressArrows = e => {
    const { dispatch } = this.props;

    if (e.keyCode === 37 /* left arrow */) {
      dispatch(manifestPrevCanvas());
    }
    if (e.keyCode === 39 /* right arrow */) {
      dispatch(manifestNextCanvas());
    }

    if (e.keyCode === 189 /* dash */) {
      this.zoomOut();
    }

    if (e.keyCode === 187 /* equals */) {
      this.zoomIn();
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
      searchAvailable,
      currentAnnotation,
      search,
      onClickAnnotation,
    } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!isLoaded || isPending) {
      return <div>loading...</div>;
    }

    const renderAnnotations = annotations.filter(
      single => single.annotation.getMotivation().toString() === 'oa:linking'
    );

    return (
      <div className={bem}>
        <Manifest jsonLd={manifest}>
          <CanvasProvider currentCanvas={currentCanvas}>
            {props => (
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
                        immediateRender: false,
                      }}
                    />
                  </OpenSeadragonViewport>
                </SingleTileSource>
                {searchAvailable ? (
                  <AnnotationRepresentation
                    annotations={search.annotations || []}
                    ratio={0.1}
                    growthStyle="fixed"
                    bemModifiers={() => ({ search: true })}
                  />
                ) : (
                  <AnnotationRepresentation
                    annotations={renderAnnotations || []}
                    ratio={0.1}
                    growthStyle="fixed"
                    bemModifiers={annotation => ({
                      selected:
                        annotation.id && annotation.id === currentAnnotation,
                    })}
                    onClickAnnotation={annotation =>
                      onClickAnnotation(annotation.__jsonld.resource)
                    }
                  />
                )}
              </FullPageViewport>
            )}
          </CanvasProvider>
        </Manifest>
      </div>
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
    searchAvailable:
      search && search.currentQuery && search.isLoading === false,
    isLoaded: !!state.manifest.currentManifest,
    manifest: state.manifest.jsonLd,
    isPending: state.manifest.isPending,
    error: state.manifest.errorMessage,
    currentCanvas: state.manifest.currentCanvas,
    currentAnnotation: state.annotations.selected
      ? state.annotations.selected.id
      : null,
    currentAnnotationData:
      state.annotations.selected && state.annotations.selected.id
        ? state.annotations.index[state.annotations.selected.id]
        : null,
    annotationIds,
    annotations: annotationIds
      ? annotationIds.map(id => state.annotations.index[id])
      : [],
  };
}

export default connect(mapStateToProps)(withBemClass('viewer')(Viewer));
