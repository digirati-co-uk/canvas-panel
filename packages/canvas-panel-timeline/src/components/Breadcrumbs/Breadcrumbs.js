/**
 * @flow
 */
import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Breadcrumbs.scss';

type Props = {
  bem: any,
  breadcrumbs: {
    path: Array<{ label: string }>,
  },
  onBack: (e: MouseEvent) => void,
};

class Breadcrumbs extends Component<Props> {
  render() {
    const { bem, breadcrumbs, onBack } = this.props;

    return (
      <div className={bem}>
        <div className={bem.element('container')}>
          {breadcrumbs.path && breadcrumbs.path.length !== 0 ? (
            breadcrumbs.path.map((item, key) => (
              <div key={key} onClick={onBack} className={bem.element('item')}>
                <div className="material-icons">navigate_before</div>{' '}
                {item.label}
              </div>
            ))
          ) : (
            <div className={bem.element('static')}>Timeline</div>
          )}
        </div>
      </div>
    );
  }
}

export default withBemClass('breadcrumbs')(Breadcrumbs);
