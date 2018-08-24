import React, { Component } from 'react';
import { withBemClass } from '../../../../canvas-panel-core/es/index';

import './CanvasNavigation.scss';

class CanvasNavigation extends Component {
  render() {
    const {
      previousRange,
      nextRange,
      canvasList,
      currentIndex,
      bem,
    } = this.props;
    return (
      <div className={bem}>
        <button
          className={bem
            .element('previous')
            .modifiers({ isFirstPage: currentIndex === 0 })}
          onClick={ev => {
            ev.preventDefault();
            previousRange();
          }}
        >
          <svg id="point-left" viewBox="0 0 100 100" width="20px" height="20px">
            <path fill="none" d="M-1-1h582v402H-1z" />
            <g>
              <path
                d="M70.173 12.294L57.446.174l-47.62 50 47.62 50 12.727-12.122-36.075-37.879z"
                fill="currentColor"
                fillRule="nonzero"
              />
            </g>
          </svg>
        </button>
        <button
          className={bem
            .element('next')
            .modifiers({ isLastPage: currentIndex === canvasList.length - 1 })}
          onClick={ev => {
            ev.preventDefault();
            nextRange();
          }}
        >
          <svg
            id="point-right"
            viewBox="0 0 100 100"
            width="20px"
            height="20px"
          >
            <path fill="none" d="M-1-1h582v402H-1z" />
            <g>
              <path
                d="M20 88.052l12.727 12.121 47.62-50-47.62-50L20 12.294l36.075 37.88z"
                fill="currentColor"
                fillRule="nonzero"
              />
            </g>
          </svg>
        </button>
      </div>
    );
  }
}

export default withBemClass('canvas-navigation')(CanvasNavigation);
