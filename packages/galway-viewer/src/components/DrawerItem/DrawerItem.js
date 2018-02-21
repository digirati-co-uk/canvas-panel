import React, { Component } from 'react';
import { renderTemporal } from '../../utils';

type Props = {
  bem: any,
  item: { label: string, id: string, children?: any },
  active: boolean,
  children?: any,
};

class DrawerItem extends Component<Props> {
  render() {
    const { bem, item, onClick, active, children } = this.props;
    return (
      <li
        key={item.id}
        className={bem.element('list-item').modifiers({ active })}
      >
        <div onClick={onClick(item)} className={bem.element('list-link')}>
          {item.label}
          <div className={bem.element('temporal')}>{renderTemporal(item)}</div>
        </div>
        {children}
      </li>
    );
  }
}

export default DrawerItem;
