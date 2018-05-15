import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ExploreButton.scss';

class ExploreButton extends Component {
  render() {
    const { bem, onClick, interactive } = this.props;
    return (
      <button className={bem.modifiers({ interactive })} onClick={onClick}>
        {interactive ? 'Back to tour' : 'Explore'}
      </button>
    );
  }
}

export default withBemClass('explore-button')(ExploreButton);
