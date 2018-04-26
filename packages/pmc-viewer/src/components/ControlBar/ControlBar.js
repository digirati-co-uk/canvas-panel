import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ControlBar.scss';

class ControlBar extends Component {
  render() {
    const { bem } = this.props;
    return <div className={bem}>{this.props.children}</div>;
  }
}

const ControlBarStyled = withBemClass('control-bar')(ControlBar);

ControlBarStyled.Left = withBemClass('control-bar')(({ children, bem }) => (
  <div className={bem.element('left')}>{children}</div>
));

ControlBarStyled.Right = withBemClass('control-bar')(({ children, bem }) => (
  <div className={bem.element('right')}>{children}</div>
));

export default ControlBarStyled;
