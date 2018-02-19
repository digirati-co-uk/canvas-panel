import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './SearchBox.scss';

class SearchBox extends Component {
  render() {
    const { bem } = this.props;

    return (
      <div className={bem}>
        <input
          placeholder="search..."
          className={bem.element('input')}
          type="text"
        />
      </div>
    );
  }
}

export default withBemClass('search-box')(SearchBox);
