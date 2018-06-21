import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ExploreButton.scss';
import Responsive from '../../../../canvas-panel-core/src/utility/Responsive';

class ExploreButton extends Component {
  render() {
    const { bem, onClick, interactive } = this.props;
    return (
      <Responsive
        phoneOnly={() => (
          <button
            className={bem.modifiers({ interactive, mobile: true })}
            onClick={onClick}
          >
            {interactive ? 'Back to tour' : 'Free explore'}
          </button>
        )}
      >
        <button className={bem.modifiers({ interactive })} onClick={onClick}>
          {interactive ? 'Back to tour' : 'Free explore'}
        </button>
      </Responsive>
    );
  }
}

export default withBemClass('explore-button')(ExploreButton);
