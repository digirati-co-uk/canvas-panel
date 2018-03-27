import React, { Component } from 'react';
import { PatchworkPlugin } from '@canvas-panel/patchwork-plugin';

import p3manifest from '../../../tests/patchwork';
import AnnWest from './Sites/VA/AnnWest';
import './Patchwork.css';

class Patchwork extends Component {
  render() {
    return (
      <AnnWest>
        <div className="patchwork-container">
          <PatchworkPlugin
            manifest="https://iiif.vam.ac.uk/collections-public/O1023003/manifest.json"
            cssClassMap={{
              annotation: 'annotation-pin',
            }}
            cssClassPrefix="patchwork-"
            height={500}
            width={1200}
          />
        </div>
        <div />
        <a
          className="btn btn--big btn--green"
          style={{ width: 'auto', margin: 30 }}
          href="https://www.vam.ac.uk/exhibitions/ocean-liners-speed-style"
        >
          See on the V&A
        </a>
      </AnnWest>
    );
  }
}

export default Patchwork;
