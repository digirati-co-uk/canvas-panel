import React, { Component } from 'react';
import {
  Manifest,
  CanvasProvider,
  FullPageViewport,
  SingleTileSource,
  OpenSeadragonViewport,
  AnnotationProvider,
  AnnotationListProvider,
  withBemClass,
} from '@canvas-panel/core';
import Container from '../Container/Container';
import TitlePanel from '../TitlePanel/TitlePanel';
import AnnotationListView from '../AnnotationListView/AnnotationListView';
import ExploreButton from '../ExploreButton/ExploreButton';
import getCurrentScrollY from '../../utils/getCurrentScrollY';

class Viewer extends Component {
  static defaultProps = {
    title: null,
    children: null,
    zoomOutSpeed: 0.5,
  };

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
      this.updateIndividual(getCurrentScrollY() / window.innerHeight);
    } else {
      this.state.viewport.zoomOut(this.props.zoomOutSpeed);
    }
    this.setState({
      interactive: !this.state.interactive,
    });
  };

  render() {
    const { manifest, title, children } = this.props;
    return (
      <div>
        <Manifest url={manifest}>
          <CanvasProvider>
            <ExploreButton
              interactive={this.state.interactive}
              onClick={this.toggleInteractive}
            />
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
              disabled={this.state.interactive}
            >
              <TitlePanel disabled={this.state.interactive}>
                {title ? <h1>{title}</h1> : null}
                {children}
              </TitlePanel>
              <AnnotationListProvider>
                <AnnotationProvider>
                  <AnnotationListView
                    setUpdater={this.setUpdater}
                    offset={1}
                    viewport={this.state.viewport}
                    disabled={this.state.interactive}
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

export default withBemClass('full-page-viewer')(Viewer);
