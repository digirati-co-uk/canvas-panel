import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  FullPageViewport,
  SingleTileSource,
  OpenSeadragonViewport,
  AnnotationProvider,
  AnnotationListProvider,
  Responsive,
  withBemClass,
} from '@canvas-panel/core';
import Container from '../Container/Container';
import TitlePanel from '../TitlePanel/TitlePanel';
import AnnotationListView from '../AnnotationListView/AnnotationListView';
import ExploreButton from '../ExploreButton/ExploreButton';
import getCurrentScrollY from '../../utils/getCurrentScrollY';
import './Viewer.scss';
import ZoomButtons from '../ZoomButtons/ZoomButtons';
import MobileAnnotationView from '../MobileAnnotationView/MobileAnnotationView';

class Viewer extends Component {
  static defaultProps = {
    title: null,
    children: null,
    zoomOutSpeed: 0.5,
    annotationPosition: 'top',
  };

  container = null;

  state = { viewport: null, updater: false, interactive: false, ready: false };

  setViewport = viewport => {
    this.setState({ viewport });
  };

  updateIndividual = n => {
    if (this.updateIndividualFunc) {
      this.updateIndividualFunc(n);
    }
  };

  zoomIn = () => {
    if (this.state.viewport) {
      this.state.viewport.zoomIn();
    }
  };

  zoomOut = () => {
    if (this.state.viewport) {
      this.state.viewport.zoomOut();
    }
  };

  setUpdater = updater => {
    this.setState({ updater: true });
    this.updateIndividualFunc = updater;
  };

  toggleInteractive = () => {
    if (this.state.interactive === true) {
      this.updateIndividual(
        getCurrentScrollY(this.getContainer()) / window.innerHeight
      );
    } else {
      this.state.viewport.zoomOut(this.props.zoomOutSpeed);
    }
    this.setState({
      interactive: !this.state.interactive,
    });
  };

  getContainer = () => this.container;

  setContainer = container => {
    this.container = container;
    this.setState({ ready: true });
  };

  render() {
    const { manifest, jsonLd, title, children, bem, style } = this.props;
    const { ready } = this.state;

    const manifestProps = {};
    if (manifest) {
      manifestProps.url = manifest;
    }
    if (jsonLd) {
      manifestProps.jsonLd = jsonLd;
    }
    return (
      <div ref={this.setContainer} className={bem} style={style}>
        <ExploreButton
          interactive={this.state.interactive}
          onClick={this.toggleInteractive}
          style={{ zIndex: 12 }}
        />
        {this.state.interactive ? (
          <ZoomButtons
            onZoomIn={this.zoomIn}
            onZoomOut={this.zoomOut}
            style={{ zIndex: 12 }}
          />
        ) : null}
        {ready ? (
          <Manifest {...manifestProps}>
            <CanvasProvider>
              <FullPageViewport
                setRef={this.setViewport}
                interactive={this.state.interactive}
                getContainer={this.getContainer}
                zIndex={5}
              >
                <SingleTileSource viewportController={true}>
                  <OpenSeadragonViewport
                    useMaxDimensions={true}
                    osdOptions={{
                      immediateRender: false,
                      showNavigator: false,
                    }}
                  />
                </SingleTileSource>
              </FullPageViewport>
              <Responsive
                phoneOnly={props => (
                  <AnnotationListProvider {...props}>
                    <AnnotationProvider>
                      <MobileAnnotationView
                        viewport={this.state.viewport}
                        disabled={this.state.interactive}
                      >
                        {title ? <h1>{title}</h1> : null}
                        {children}
                      </MobileAnnotationView>
                    </AnnotationProvider>
                  </AnnotationListProvider>
                )}
              >
                <Container
                  updateIndividual={this.updateIndividual}
                  updater={this.state.updater}
                  disabled={this.state.interactive}
                  getContainer={this.getContainer}
                  style={{ zIndex: 11 }}
                >
                  <TitlePanel
                    getContainer={this.getContainer}
                    disabled={this.state.interactive}
                  >
                    {title ? <h1>{title}</h1> : null}
                    {children}
                    <button
                      className={bem.element('start-button')}
                      onClick={() =>
                        (this.container.scrollTop = window.innerHeight - 10)
                      }
                    >
                      Start tour
                    </button>
                  </TitlePanel>
                  <AnnotationListProvider>
                    <AnnotationProvider>
                      <AnnotationListView
                        annotationPosition={this.props.annotationPosition}
                        setUpdater={this.setUpdater}
                        offset={1}
                        viewport={this.state.viewport}
                        disabled={this.state.interactive}
                        onNext={(annotation, key) =>
                          (this.container.scrollTop =
                            (key + 1) * window.innerHeight - 10)
                        }
                        onPrevious={(annotation, key) =>
                          (this.container.scrollTop =
                            (key + 1) * window.innerHeight)
                        }
                      />
                    </AnnotationProvider>
                  </AnnotationListProvider>
                </Container>
              </Responsive>
            </CanvasProvider>
          </Manifest>
        ) : null}
      </div>
    );
  }
}

export default withBemClass('full-page-viewer')(Viewer);
