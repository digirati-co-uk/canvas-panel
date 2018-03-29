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
      </AnnWest>
    );
  }
}

export default Patchwork;
