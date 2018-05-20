import React, { Component } from 'react';
import { FullPageViewer } from '@canvas-panel/full-page-plugin';

class FullPage extends Component {
  render() {
    return (
      <FullPageViewer
        manifest="https://iiif.vam.ac.uk/collections-public/O1023003/manifest.json"
        title="Ocean liners"
      >
        <p>Full page plugin. Scroll down to start experience.</p>
        <span className="muted">© Victoria and Albert Museum, London 2018</span>
      </FullPageViewer>
    );
  }
}

export default FullPage;
