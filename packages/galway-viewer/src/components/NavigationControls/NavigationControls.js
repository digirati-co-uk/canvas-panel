import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '@canvas-panel/redux/es/spaces/manifest';
import { withBemClass } from '@canvas-panel/core';
import './NavigationControls.scss';

class NavigationControls extends Component {
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
          navigate_before
        </button>
        <button
          onClick={() => dispatch(manifestNextCanvas())}
          className={`${bem.element('button').modifier('next')} material-icons`}
        >
          navigate_next
        </button>
      </nav>
    );
  }
}

export default connect()(
  withBemClass('navigation-controls')(NavigationControls)
);
