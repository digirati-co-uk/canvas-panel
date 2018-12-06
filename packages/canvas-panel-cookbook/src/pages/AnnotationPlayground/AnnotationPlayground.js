import React, { Component } from 'react';
import 'brace';
import 'brace/mode/json';
import 'brace/theme/tomorrow_night_eighties';
import AceEditor from 'react-ace';
import Manifesto from 'manifesto.js';
import {
  Manifest,
  CanvasProvider,
  Viewport,
  SingleTileSource,
  OpenSeadragonViewport,
  SizedViewport,
  functionOrMapChildren,
  AnnotationDetail,
  FullPageViewport,
  AnnotationRepresentation,
  AnnotationSelector,
} from '@canvas-panel/core';
import './AnnotationPlayground.scss';

const defaultAnnotation = `
{
  "type": "Annotation",
  "@context": "http://www.w3.org/ns/anno.jsonld",
  "label": "The nucleus",
  "body": {
    "value": "In the nucleus - as shown in the photograph many thousands of times larger - the answer lies in the quest of the genome.",
    "type": "TextualBody",
    "purpose": "tagging",
    "format": "text/plain"
  },
  "target": {
    "id": "https://wellcomelibrary.org/iiif/b18035723/canvas/c4#xywh=979,513,470,388",
    "type": "Canvas",
    "dcterms:isPartOf": {
      "id": "https://wellcomelibrary.org/iiif/b18035723/manifest",
      "type": "Manifest",
      "label": "Wunder der Vererbung"
    }
  },
  "motivation": {
    "id": "http://www.w3.org/ns/oa#tagging",
    "label": "tagging"
  },
  "generator": "/capture-models/generic/describing.json"
}
`;

class Viewer extends Component {
  state = { error: null, manifest: null, canvas: null };

  componentDidCatch(error, errorInfo) {
    console.error('error', error, errorInfo);
    this.setState({ error: error });
  }

  componentDidMount() {
    this.setManifest(this.props);
  }

  componentWillReceiveProps(newProps, newContext) {
    this.setState({ error: null });
    this.setManifest(newProps);
  }

  setManifest({ annotation }) {
    if (
      !annotation ||
      !annotation.target ||
      !annotation.target['dcterms:isPartOf']
    ) {
      return this.setState({ manifest: null, error: 'Manifest not found' });
    }

    this.setState({ canvas: annotation.target.id.split('#')[0] });

    if (annotation.target['dcterms:isPartOf'].id !== this.state.manifest) {
      this.setState({
        manifest: annotation.target['dcterms:isPartOf'].id,
      });
    }

    const on = AnnotationSelector.parse(annotation.target.id);
    setTimeout(() => {
      this.viewer.goToRect(on.selector, 200, 1.5);
    }, 500);
  }

  render() {
    const { error, manifest, canvas } = this.state;
    const { annotation } = this.props;
    const anno = Manifesto.Utils.createAnnotation(annotation);

    if (error || !manifest || !canvas) {
      return (
        <div>
          <h3>Please check your annotation</h3>
          <code>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </code>
        </div>
      );
    }
    return (
      <Manifest url={manifest}>
        <CanvasProvider startCanvas={canvas} currentCanvas={canvas}>
          <SingleTileSource viewportController={true}>
            <FullPageViewport
              setRef={viewer => (this.viewer = viewer)}
              position="relative"
              interactive={true}
            >
              <OpenSeadragonViewport
                useMaxDimensions={true}
                osdOptions={{
                  visibilityRatio: 1,
                  constrainDuringPan: true,
                  showNavigator: false,
                }}
              />
              <AnnotationRepresentation
                annotations={[
                  {
                    annotation: anno,
                    on: AnnotationSelector.parse(annotation.target.id),
                  },
                ]}
              />
            </FullPageViewport>
          </SingleTileSource>
        </CanvasProvider>
      </Manifest>
    );
  }
}

class AnnotationPlayground extends Component {
  state = { currentAnnotation: defaultAnnotation };

  onChange = value => {
    this.setState({ currentAnnotation: value });
  };

  getAnnotation() {
    const { currentAnnotation } = this.state;
    try {
      return currentAnnotation ? JSON.parse(currentAnnotation) : null;
    } catch (e) {
      return null;
    }
  }

  render() {
    const { currentAnnotation } = this.state;
    const annotation = this.getAnnotation();

    return (
      <div>
        <main style={{ display: 'flex', minHeight: '100vh' }}>
          <aside style={{ width: 600 }}>
            <AceEditor
              mode="json"
              theme="tomorrow_night_eighties"
              onChange={this.onChange}
              name="annotation-editor"
              value={currentAnnotation}
              editorProps={{ $blockScrolling: true }}
              style={{ width: 600, height: '100vh' }}
            />
          </aside>
          <article
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
            {annotation ? (
              <div style={{ flexGrow: 1, position: 'relative' }}>
                <Viewer annotation={annotation} />
              </div>
            ) : null}
            <div style={{ height: 400, padding: 30 }}>
              {annotation ? (
                <div>
                  <h1>{annotation.label}</h1>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: annotation.body ? annotation.body.value : '',
                    }}
                  />
                </div>
              ) : null}
            </div>
          </article>
        </main>
      </div>
    );
  }
}

export default AnnotationPlayground;
