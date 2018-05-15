import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './TitlePanel.scss';

class TitlePanel extends Component {
  render() {
    const { style, bem, disabled } = this.props;
    return (
      <div className={bem.modifiers({ disabled })} style={style}>
        <div className={bem.element('inner')}>{this.props.children}</div>
      </div>
    );
  }
}

export default withBemClass('title-panel')(TitlePanel);
