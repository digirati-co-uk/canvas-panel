import React, { Component } from 'react';
import {
  computeStyleFromItem,
  generateColour,
  renderTemporal,
} from '../../redux/structure.utility';

class TimelineItem extends Component {
  render() {
    const {
      bem,
      visibility,
      onClick,
      isActive,
      item,
      maxItems,
      ...props
    } = this.props;
    return (
      <div
        onClick={onClick(item, isActive)}
        className={bem.element('item').modifiers({
          active: isActive,
          children: isActive && item.children,
        })}
        style={computeStyleFromItem(visibility, item, maxItems)}
        {...props}
      >
        <div
          className={bem.element('representation')}
          style={{ background: generateColour(item.level) }}
        />
        <div className={bem.element('temporal')}>{renderTemporal(item)}</div>
      </div>
    );
  }
}

export default TimelineItem;
