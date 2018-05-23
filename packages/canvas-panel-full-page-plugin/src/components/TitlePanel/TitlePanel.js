import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './TitlePanel.scss';
import ScrollDownIcon from '../../../es/components/ScrollDownIcon/ScrollDownIcon';

class TitlePanel extends Component {
  render() {
    const { style, bem, disabled, current } = this.props;
    console.log(current);
    return (
      <div className={bem.modifiers({ disabled })} style={style}>
        <div className={bem.element('inner')}>{this.props.children}</div>
        <ScrollDownIcon style={{ opacity: current === 0 ? 1 : 0 }} />
      </div>
    );
  }
}

export default withBemClass('title-panel')(TitlePanel);
