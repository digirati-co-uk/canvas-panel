import React, { Component } from 'react';
import { FullPageViewer } from '@canvas-panel/full-page-plugin';

class FullPage extends Component {
  render() {
    return (
      <div>
        <FullPageViewer
          manifest="https://stephenwf.github.io/ocean-liners.json"
          title="Ocean liners"
        >
          <p>Full page plugin. Scroll down to start experience.</p>
          <span className="muted">
            © Victoria and Albert Museum, London 2018
          </span>
        </FullPageViewer>
      </div>
    );
  }
}

export default FullPage;
