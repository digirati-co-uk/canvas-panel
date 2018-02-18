/**
 * @flow
 */
import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { renderTemporal } from '../../utils';
import type BEM from 'digirati-bem-js';

type Props = {
  bem: BEM,
  item: {
    label: string,
    temporal: string[],
  },
};

class TimelineTitle extends Component<Props> {
  render() {
    const { bem, item } = this.props;
    return (
      <div className={bem}>
        <h1 className={bem.element('title')}>{item.label}</h1>
        <span className={bem.element('sub-title')}>{renderTemporal(item)}</span>
      </div>
    );
  }
}

export default withBemClass('timeline-title')(TimelineTitle);
