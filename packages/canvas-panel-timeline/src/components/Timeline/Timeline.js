import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Timeline.scss';
import {
  decreaseStructureDepth,
  increaseStructureDepth,
  mapStateToProps,
} from '../../redux/structure';
import { manifest as manifestActions } from '@canvas-panel/redux';
import {
  matchesRange,
  getPalletXPosition,
  renderTemporal,
  RANGE_DISPLAY_NONE,
  RANGE_DISPLAY_LARGE,
  RANGE_DISPLAY_PREV_NEXT,
} from '../../redux/structure.utility';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { withBemClass } from '@canvas-panel/core';
import TimelineItem from '../TimelineItem/TimelineItem';
import TimelineTooltip from '../TimelineTooltip/TimelineTooltip';

class Timeline extends Component {
  state = {
    hoveredItem: null,
  };

  getVisibilityFromItem(item, key) {
    const { topKeys, currentViews, depth, current } = this.props;
    if (currentViews.length === 0 || depth === 0) {
      return topKeys.indexOf(item.key) === -1
        ? RANGE_DISPLAY_NONE
        : RANGE_DISPLAY_LARGE;
    }

    const activeItem = current.findCurrent(key);
    if (current.isNext(key) || current.isPrevious(key)) {
      return RANGE_DISPLAY_PREV_NEXT;
    }
    if (activeItem) {
      return RANGE_DISPLAY_LARGE;
    }
    return RANGE_DISPLAY_NONE;
  }

  handleBack = () => {
    const { dispatch } = this.props;
    dispatch(decreaseStructureDepth());
  };

  handleMouseIn = item => () => {
    this.setState({ hoveredItem: item.label });
  };

  handleContainerMouseIn = () => {
    this.setState({ hover: true });
  };

  handleContainerMouseOut = () => {
    this.setState({ hover: false });
  };

  handleOnClick = item => () => {
    const { dispatch } = this.props;
    if (item.children) {
      dispatch(increaseStructureDepth());
    }
    dispatch(manifestActions.manifestSetCanvas(item.range[0]));
  };

  handleMouseMove = e => {
    if (this.tooltip) {
      const calc = getPalletXPosition(
        this.tooltip.getBoundingClientRect().width,
        e.clientX,
        window.innerWidth
      );
      this.tooltip.style.left = `${calc}px`;
    }
  };

  setTooltip = tooltip => (this.tooltip = tooltip);

  render() {
    const { hoveredItem, hover } = this.state;
    const { flatItems, bem, canvasIndex, activeItem, breadcrumbs } = this.props;
    if (!flatItems) {
      return <div />;
    }
    const maxItems = flatItems
      .filter(
        (item, key) =>
          this.getVisibilityFromItem(item, key) === RANGE_DISPLAY_LARGE
      )
      .map(item => item.range[1] - item.range[0])
      .reduce((acc, next) => acc + next, 0);

    return (
      <nav className={`${bem}  galway-layout__top`}>
        <Breadcrumbs breadcrumbs={breadcrumbs} onBack={this.handleBack} />
        <TimelineTooltip getElement={this.setTooltip} bem={bem} active={hover}>
          {hoveredItem}
        </TimelineTooltip>
        <div
          onMouseEnter={this.handleContainerMouseIn}
          onMouseLeave={this.handleContainerMouseOut}
          className={bem.element('item-container')}
        >
          {flatItems.map((item, key) => (
            <TimelineItem
              key={key}
              bem={bem}
              item={item}
              isActive={matchesRange(item, canvasIndex)}
              visibility={this.getVisibilityFromItem(item, key)}
              maxItems={maxItems}
              onClick={this.handleOnClick}
              onMouseEnter={this.handleMouseIn(item)}
              onMouseMove={this.handleMouseMove}
            />
          ))}
        </div>
        <div className={bem.element('title')}>
          <h1 className="mdc-typography">{activeItem.label}</h1>
          <span className="mdc-typography">{renderTemporal(activeItem)}</span>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps)(withBemClass('timeline')(Timeline));
