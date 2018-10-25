import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './TitlePanel.scss';
import ScrollDownIcon from '../ScrollDownIcon/ScrollDownIcon';

class TitlePanel extends Component {
  render() {
    const { style, bem, disabled, getContainer, current } = this.props;

    return (
      <div className={bem.modifiers({ disabled })} style={style}>
        <div className={bem.element('inner')}>{this.props.children}</div>
        <ScrollDownIcon
          getContainer={getContainer}
          style={{ opacity: current === 0 ? 1 : 0 }}
        />
      </div>
    );
  }
}

export default withBemClass('title-panel')(TitlePanel);
