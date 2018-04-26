import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '@canvas-panel/redux/es/spaces/manifest';
import { withBemClass } from '@canvas-panel/core';
import './Pagination.scss';

class Pagination extends Component {
  render() {
    const { dispatch, bem } = this.props;

    return (
      <nav className={bem}>
        <button
          onClick={() => dispatch(manifestPrevCanvas())}
          className={`${bem
            .element('button')
            .modifier('previous')} material-icons`}
        >
          arrow_back
        </button>
        <button
          onClick={() => dispatch(manifestNextCanvas())}
          className={`${bem.element('button').modifier('next')} material-icons`}
        >
          arrow_forward
        </button>
      </nav>
    );
  }
}

export default connect()(withBemClass('pagination')(Pagination));
