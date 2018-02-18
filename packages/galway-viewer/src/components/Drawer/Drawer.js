import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  increaseStructureDepth,
  mapStateToProps,
} from '../../redux/spaces/structure';
import { withBemClass } from '@canvas-panel/core';
import './Drawer.scss';
import { renderTemporal } from '../../utils';
import { manifestSetCanvas } from '../../redux/spaces/manifest';

class Drawer extends Component {
  state = {
    inactive: true,
  };

  renderItem = (item, active, children) => {
    const { bem } = this.props;
    return (
      <li
        key={item.id}
        className={bem.element('list-item').modifiers({ active })}
      >
        <div
          onClick={this.handleItemClick(item)}
          className={bem.element('list-link')}
        >
          {item.label}
          <div className={bem.element('temporal')}>{renderTemporal(item)}</div>
        </div>
        {children}
      </li>
    );
  };

  handleItemClick = item => e => {
    const { dispatch } = this.props;

    dispatch(increaseStructureDepth());
    if (item && item.range) {
      dispatch(manifestSetCanvas(item.range[0]));
    }

    if (!item.children) {
      this.closeDrawer();
    }
  };

  openDrawer = () => {
    this.setState({ inactive: false });
  };

  closeDrawer = () => {
    this.setState({ inactive: true });
  };

  renderItemList = (item, key) => {
    const { bem, top } = this.props;
    const isActive = top && item.id === top.id;
    if (!item.children) {
      return this.renderItem(item, isActive);
    }

    return this.renderItem(
      item,
      isActive,
      <ul key={key} className={bem.element('list')}>
        {item.children.map(this.renderItemList)}
      </ul>
    );
  };

  render() {
    const { inactive } = this.state;
    const { bem, structure } = this.props;

    return (
      <aside className={bem.modifiers({ inactive })}>
        <div className={bem.element('menu')}>
          <ul className={bem.element('list')}>
            {structure ? structure.map(this.renderItemList) : 'loading...'}
          </ul>
        </div>
        <div onClick={this.closeDrawer} className={bem.element('background')} />
      </aside>
    );
  }
}

export default connect(mapStateToProps, null, null, { withRef: true })(
  withBemClass('drawer')(Drawer)
);
