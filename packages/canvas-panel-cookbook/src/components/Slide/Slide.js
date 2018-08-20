import React, { Component } from 'react';
import { functionOrMapChildren, withBemClass } from '@canvas-panel/core';
import SwappableView from '../SwappableView';

class Slide extends Component {
  render() {
    const { bem, children, behaviors, manifest, canvas, region } = this.props;
    return (
      <div
        className={bem.modifiers(
          behaviors.reduce((acc, next) => {
            acc[next] = true;
            return acc;
          }, {})
        )}
      >
        <SwappableView manifest={manifest} canvas={canvas} region={region} />
        {functionOrMapChildren(children, {
          canvas: canvas,
        })}
      </div>
    );
  }
}

export default withBemClass('slide')(Slide);
