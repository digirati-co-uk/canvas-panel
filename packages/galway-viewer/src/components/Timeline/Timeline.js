import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Timeline.scss';
import {
  decreaseStructureDepth,
  increaseStructureDepth,
  mapStateToProps,
} from '../../redux/spaces/structure';
import { matchesRange } from '../../redux/spaces/structure.utility';
import { manifestSetCanvas } from '../../redux/spaces/manifest';
import {
  generateColour,
  getPalletXPosition,
  renderTemporal,
} from '../../utils';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { withBemClass } from '../../../../canvas-panel-core/src';

export const RANGE_DISPLAY_NONE = 'RANGE_DISPLAY_NONE';
export const RANGE_DISPLAY_LARGE = 'RANGE_DISPLAY_LARGE';
export const RANGE_DISPLAY_PREV_NEXT = 'RANGE_DISPLAY_PREV_NEXT';

export function computeStyleFromItem(visibility, item) {
  if (visibility === RANGE_DISPLAY_NONE) {
    return { flex: 0.0001, flexBasis: '0px', transform: 'translateX(3px)' };
  }
  if (visibility === RANGE_DISPLAY_PREV_NEXT) {
    return { flex: '0 0 80px', transform: 'initial' };
  }
  if (visibility === RANGE_DISPLAY_LARGE && item) {
    return {
      flex: item.range[1] - item.range[0],
      flexBasis: '0px',
      transform: 'initial',
    };
  }
  return {};
}

class Tooltip extends Component {
  setElement(el) {
    const { getElement } = this.props;
    if (getElement) {
      getElement(el);
    }
  }

  render() {
    const { bem, active, children } = this.props;
    return (
      <div className={bem.element('tooltip')}>
        <div
          ref={el => this.setElement(el)}
          className={bem.element('tooltip-float').modifiers({ active })}
        >
          {children}
        </div>
      </div>
    );
  }
}

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

  handleOnClick = (item, isActive) => () => {
    const { dispatch } = this.props;
    if (item.children) {
      dispatch(increaseStructureDepth());
    }
    dispatch(manifestSetCanvas(item.range[0]));
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

  render() {
    const { hoveredItem, hover } = this.state;
    const { flatItems, bem, canvasIndex, activeItem, breadcrumbs } = this.props;
    if (!flatItems) {
      return <div>Loading...</div>;
    }
    return (
      <nav className="galway-timeline galway-layout__top">
        <Breadcrumbs breadcrumbs={breadcrumbs} onBack={this.handleBack} />
        <Tooltip
          getElement={el => (this.tooltip = el)}
          bem={bem}
          active={hover}
        >
          {hoveredItem}
        </Tooltip>
        <div
          onMouseEnter={this.handleContainerMouseIn}
          onMouseLeave={this.handleContainerMouseOut}
          className="galway-timeline__item-container"
        >
          {flatItems.map((item, key) => {
            const isActive = matchesRange(item, canvasIndex);
            const visibility = this.getVisibilityFromItem(item, key);
            return (
              <div
                key={key}
                onClick={this.handleOnClick(item, isActive)}
                onMouseEnter={this.handleMouseIn(item)}
                onMouseMove={this.handleMouseMove}
                className={`galway-timeline__item ${
                  isActive ? 'galway-timeline__item--active' : ''
                } ${
                  isActive && item.children
                    ? 'galway-timeline__item--children'
                    : ''
                }`}
                style={computeStyleFromItem(visibility, item)}
              >
                <div
                  className="galway-timeline__representation"
                  style={{ background: generateColour(item.level) }}
                />
                <div className="galway-timeline__temporal">
                  {renderTemporal(item)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="galway-timeline__title">
          <h1 className="mdc-typography">{activeItem.label}</h1>
          <span className="mdc-typography">{renderTemporal(activeItem)}</span>
        </div>
      </nav>
    );
  }
}

export default connect(mapStateToProps)(
  withBemClass('galway-timeline')(Timeline)
);
