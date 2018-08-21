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
          Prev
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
          Next
        </button>
      </div>
    );
  }
}

export default withBemClass('canvas-navigation')(CanvasNavigation);
