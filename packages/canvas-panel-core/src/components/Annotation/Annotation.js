/**
 * @flow
 */

import React, { Component } from 'react';
import * as Manifesto from 'manifesto.js';
import { withBemClass } from '../Bem/Bem';
import type { BemBlockType } from '../Bem/Bem';

type Vector = {
  x: number,
  y: number,
  width?: number,
  height?: number,
};

type Props = {
  ...Vector,
  annotation: Manifesto.Annotation,
  bem: BemBlockType,
  style: { [string]: any },
  bemModifiers: (
    annotation: Manifesto.Annotation,
    props: Props
  ) => { [string]: boolean },
  onClick: (
    annotation: Manifesto.Annotation,
    vect: Vector,
    e: MouseEvent
  ) => void,
};

class Annotation extends Component<Props> {
  handleClick = e =>
    this.props.onClick
      ? this.props.onClick(
          this.props.annotation,
          {
            x: this.props.x || 0,
            y: this.props.y || 0,
            width: this.props.width,
            height: this.props.height,
          },
          e
        )
      : null;

  render() {
    const { style, bem, bemModifiers, annotation } = this.props;
    const modifiers = bemModifiers
      ? bemModifiers(annotation, this.props)
      : null;

    return (
      <div
        className={modifiers ? bem.modifiers(modifiers) : bem}
        style={style}
        onClick={this.handleClick}
      />
    );
  }
}

export default withBemClass('annotation')(Annotation);
