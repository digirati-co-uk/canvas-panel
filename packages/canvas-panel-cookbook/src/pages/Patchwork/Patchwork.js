import React, { Component } from 'react';
import { PatchworkPlugin } from '@canvas-panel/patchwork-plugin';
import AnnWest from '../../Sites/VA/AnnWest';
import './Patchwork.css';

class Patchwork extends Component {
  render() {
    return (
      <AnnWest>
        <div className="patchwork-container">
          <PatchworkPlugin
            manifest="https://stephenwf.github.io/ocean-liners.json"
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
