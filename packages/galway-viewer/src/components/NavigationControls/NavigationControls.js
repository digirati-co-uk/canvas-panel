import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '../../redux/spaces/manifest';
import { withBemClass } from '@canvas-panel/core';
import './NavigationControls.scss';

class NavigationControls extends Component {
  render() {
    const { dispatch, bem } = this.props;

    return (
      <nav className={bem} className4="galway-controls__pagination">
        <button
          onClick={() => dispatch(manifestPrevCanvas())}
          className={`${bem
            .element('button')
            .modifier('previous')} material-icons`}
          className4="galway-controls__button galway-controls__button--previous material-icons"
        >
          navigate_before
        </button>
        <button
          onClick={() => dispatch(manifestNextCanvas())}
          className={`${bem.element('button').modifier('next')} material-icons`}
          className4="galway-controls__button galway-controls__button--next material-icons"
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
