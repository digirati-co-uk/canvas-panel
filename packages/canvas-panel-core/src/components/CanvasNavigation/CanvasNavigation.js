import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import CanvasProvider from '../../manifesto/CanvasProvider/CanvasProvider';

class CanvasNavigation extends Component {
  render() {
    const { dispatch } = this.props;

    return (
      <div>
        <button onClick={() => dispatch(CanvasProvider.prevCanvas())}>
          Prev
        </button>
        <button onClick={() => dispatch(CanvasProvider.nextCanvas())}>
          Next
        </button>
      </div>
    );
  }
}

export default CanvasNavigation;
