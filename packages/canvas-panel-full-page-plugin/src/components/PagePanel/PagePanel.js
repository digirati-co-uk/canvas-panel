import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './PagePanel.scss';

class PagePanel extends Component {
  render() {
    const { style, bem } = this.props;
    return (
      <div
        className={bem.modifiers({ disabled: this.props.disabled })}
        style={style}
      >
        <div className={bem.element('inner')}>{this.props.children}</div>
      </div>
    );
  }
}

export default withBemClass('page-panel')(PagePanel);
