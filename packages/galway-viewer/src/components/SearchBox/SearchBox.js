import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { connect } from 'react-redux';
import './SearchBox.scss';
import {
  searchNextCanvas,
  searchPrevCanvas,
  searchRequest,
} from '../../redux/spaces/search';

class SearchBox extends Component {
  input = null;
  render() {
    const { bem } = this.props;

    return (
      <div className={bem}>
        <input
          ref={input => (this.input = input)}
          placeholder="search..."
          className={bem.element('input')}
          type="text"
        />
        <button
          className={bem.element('button')}
          onClick={() =>
            this.props.dispatch(searchRequest({ q: this.input.value }))
          }
        >
          go
        </button>
        <button
          className={bem.element('button')}
          onClick={() => this.props.dispatch(searchPrevCanvas())}
        >
          {'<'}
        </button>
        <button
          className={bem.element('button')}
          onClick={() => this.props.dispatch(searchNextCanvas())}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const searchState = state.search;
  return {};
}

export default connect(mapStateToProps)(withBemClass('search-box')(SearchBox));
