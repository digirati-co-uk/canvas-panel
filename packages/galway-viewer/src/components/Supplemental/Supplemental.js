import React, { Component } from 'react';
import { withBemClass } from '../../../../canvas-panel-core/src';
import { connect } from 'react-redux';
import './Supplemental.scss';
import {
  Manifest,
  CanvasProvider,
  CanvasNavigation,
  SingleTileSource,
  OpenSeadragonViewer,
  FullPageViewport,
} from '@canvas-panel/core';
import OpenSeadragonViewport from '../../../../canvas-panel-core/src/viewers/OpenSeadragonViewport/OpenSeadragonViewport';
import { deselectAnnotation } from '../../redux/spaces/annotations';

function getManifestData(annotation) {
  const jsonLd = annotation.annotation.__jsonld;
  if (
    jsonLd &&
    (jsonLd.resource['@type'] || '').toLowerCase() === 'sc:canvas'
  ) {
    if (
      (jsonLd.resource.within['@type'] || '').toLowerCase() === 'sc:manifest'
    ) {
      return {
        label: jsonLd.resource.within.label,
        manifest: jsonLd.resource.within['@id'],
        description: jsonLd.resource.within.description,
        canvasId: jsonLd.resource['@id'],
      };
    }
  }
}

class Supplemental extends Component {
  state = {
    loading: false,
    manifest: null,
  };

  componentWillMount() {
    this.setAnnotation(this.props.annotation);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.annotation !== this.props.annotation) {
      this.setAnnotation(newProps.annotation);
    }
  }

  setAnnotation(annotation) {
    console.log('setting annotation', annotation);
    if (!annotation) {
      return;
    }
    const manifestData = getManifestData(annotation);
    if (manifestData) {
      this.setState({
        loading: true,
        manifestId: manifestData.manifest,
      });
      fetch(manifestData.manifest, { cache: 'force-cache' })
        .then(r => r.json())
        .then(manifest => {
          if (manifestData.manifest === this.state.manifestId) {
            this.setState({
              loading: false,
              manifest,
              active: true,
            });
          }
        });
    }
  }

  close = () => {
    this.setState({ active: false });
    this.props.dispatch(deselectAnnotation());
  };

  render() {
    const { manifest, loading, active } = this.state;
    const { annotation, bem } = this.props;
    return (
      <div className={bem.modifiers({ active })}>
        <div onClick={this.close} className={bem.element('lightbox')} />
        {annotation && manifest && loading === false ? (
          <div className={bem.element('inner-content')}>
            <div onClick={this.close} className={bem.element('close')}>
              &times;
            </div>
            <div className={bem.element('inner')}>
              {/*
              div({className: 'galway-supplemental__aside'}, [
                div({className: 'galway-supplemental__title'}, [
                  manifest.label,
                ]),
                div({className: 'galway-supplemental__description'}, [
                  manifest.description || '(no description)',
                ]),
                repo
              ])
            );

            this.$inner.appendChild(
              div({className: 'galway-supplemental__images'}, images)
            );
          */}
              <div className={bem.element('aside')}>
                <div className={bem.element('title')}>{manifest.label}</div>
                <div className={bem.element('description')}>
                  {manifest.description || '(no description)'}
                </div>
                {/* Render repository link */}
              </div>
              <div className={bem.element('images')}>
                <Manifest jsonLd={manifest}>
                  <CanvasProvider startCanvas={0}>
                    <SingleTileSource>
                      <FullPageViewport interactive={true} position="relative">
                        <OpenSeadragonViewport
                          useMaxDimensions={true}
                          osdOptions={{
                            visibilityRatio: 1,
                            constrainDuringPan: true,
                            showNavigator: false,
                          }}
                        />
                      </FullPageViewport>
                    </SingleTileSource>
                  </CanvasProvider>
                </Manifest>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    annotationId: state.annotations.selected.id,
    annotation: state.annotations.selected.id
      ? state.annotations.index[state.annotations.selected.id]
      : null,
  };
}

export default connect(mapStateToProps)(
  withBemClass('supplemental')(Supplemental)
);
