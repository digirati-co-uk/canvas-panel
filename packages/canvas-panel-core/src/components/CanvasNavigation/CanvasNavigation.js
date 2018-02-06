import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import CanvasProvider from '../../manifesto/CanvasProvider/CanvasProvider';
import { withBemClass } from '../Bem/Bem';

class CanvasNavigation extends Component {
  render() {
    const { dispatch, bem } = this.props;

    return (
      <div className={bem}>
        <button
          className={bem.element('previous')}
          onClick={() => dispatch(CanvasProvider.prevCanvas())}
        >
          Prev
        </button>
        <button
          className={bem.element('next')}
          onClick={() => dispatch(CanvasProvider.nextCanvas())}
        >
          Next
        </button>
      </div>
    );
  }
}

export default withBemClass('canvas-navigation')(CanvasNavigation);
