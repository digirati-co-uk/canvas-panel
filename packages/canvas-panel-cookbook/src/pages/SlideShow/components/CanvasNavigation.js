import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withBemClass } from '@canvas-panel/core';

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
    const isFirstPage = currentIndex !== 0;
    const isLastPage = currentIndex !== canvasList.length - 1;
    return (
      <div className={bem}>
        {isFirstPage ? (
          <button className={bem.element('previous')} onClick={previousRange}>
            Prev
          </button>
        ) : (
          ''
        )}
        {isLastPage ? (
          <button className={bem.element('next')} onClick={nextRange}>
            Next
          </button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withBemClass('canvas-navigation')(CanvasNavigation);
