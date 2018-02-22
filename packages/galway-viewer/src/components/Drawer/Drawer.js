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
import DrawerItem from '../DrawerItem/DrawerItem';

class Drawer extends Component {
  state = {
    inactive: true,
  };

  pressEscape = e => (e.keyCode === 27 ? this.closeDrawer() : null);

  componentDidMount() {
    document.addEventListener('keydown', this.pressEscape);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.pressEscape);
  }

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
      return (
        <DrawerItem
          bem={bem}
          onClick={this.handleItemClick}
          item={item}
          active={isActive}
        />
      );
    }

    return (
      <DrawerItem
        bem={bem}
        onClick={this.handleItemClick}
        item={item}
        active={isActive}
      >
        <ul key={key} className={bem.element('list')}>
          {item.children.map(this.renderItemList)}
        </ul>
      </DrawerItem>
    );
  };

  isEmpty() {
    return !this.props.structure;
  }

  render() {
    const { inactive } = this.state;
    const { bem, structure } = this.props;

    return (
      <aside className={bem.modifiers({ inactive })}>
        <div className={bem.element('menu')}>
          <ul className={bem.element('list')}>
            {structure
              ? structure.map(this.renderItemList)
              : 'There is no structure data available.'}
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
