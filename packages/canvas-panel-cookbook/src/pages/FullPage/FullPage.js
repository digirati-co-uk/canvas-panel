import React, { Component } from 'react';
import { FullPageViewer } from '@canvas-panel/full-page-plugin';
import QueryStringProvider from '../../QueryStringProvider';

class FullPage extends QueryStringProvider {
  render() {
    let manifestURI = 'https://stephenwf.github.io/ocean-liners.json';
    if (
      this.urlParams.hasOwnProperty('manifest') &&
      this.urlParams.manifest.constructor === String
    ) {
      manifestURI = this.urlParams.manifest;
    }
    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <FullPageViewer
          manifest={manifestURI}
          title="Ocean liners"
          annotationPosition="top"
        >
          <p>Scroll down to start or click the 'start tour' button.</p>
          <span className="muted">
            © Victoria and Albert Museum, London 2018
          </span>
        </FullPageViewer>
      </div>
    );
  }
}

export default FullPage;
