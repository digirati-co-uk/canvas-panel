/**
 * @flow
 */

import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ImageContainer.scss';
import type BEM from 'digirati-bem-js';

type Props = {
  bem: BEM,
  canvas: any,
  width: number,
  height: number,
  className?: string,
  onActivate: (e: MouseEvent, Props) => any,
};

type State = {
  disabled: boolean,
};

class ImageContainer extends Component<Props, State> {
  state = {
    disabled: false,
  };

  componentWillReceiveProps(newProps) {
    if (newProps.canvas !== this.props.canvas) {
      this.setState({ disabled: false });
    }
  }

  handleOnActivate = e => {
    const { onActivate } = this.props;
    if (onActivate) {
      e.preventDefault();
      onActivate(e, this.props);
    }
    this.setState({ disabled: true });
  };

  render() {
    const { bem, canvas, width, height, className } = this.props;
    const { disabled } = this.state;

    return (
      <div
        className={`${bem.modifiers({ disabled })} ${className || ''}`}
        onClick={this.handleOnActivate}
        onTouchStart={this.handleOnActivate}
        onWheel={this.handleOnActivate}
      >
        <img
          className={bem.element('image')}
          src={canvas.getCanonicalImageUri()}
          data-width={width}
          data-height={height}
        />
      </div>
    );
  }
}

export default withBemClass('image-container')(ImageContainer);
