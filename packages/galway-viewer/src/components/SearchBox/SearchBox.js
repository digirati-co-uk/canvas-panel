import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { connect } from 'react-redux';
import './SearchBox.scss';
import {
  searchCancel,
  searchNextCanvas,
  searchPrevCanvas,
  searchRequest,
} from '../../redux/spaces/search';

class SearchBox extends Component {
  input = null;

  state = { open: false };

  openSearch = () => {
    if (!this.state.open) {
      setTimeout(() => this.input.focus(), 120);
    } else {
      this.input.value = '';
      this.props.dispatch(searchCancel());
    }
    this.setState({ open: !this.state.open });
  };

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      // ENTER
      this.props.dispatch(searchRequest({ q: this.input.value }));
    }
  };

  render() {
    const {
      bem,
      searchAvailable,
      currentQuery,
      highlights,
      currentHighlight,
    } = this.props;

    if (!searchAvailable) {
      return <div />;
    }

    return (
      <div className={bem.modifiers({ open: this.state.open })}>
        <button
          className={`${bem.element('search-icon')} material-icons`}
          onClick={this.openSearch}
        >
          {this.state.open ? 'close' : 'search'}
        </button>
        <div
          className={bem.element('container')}
          style={{ position: 'relative' }}
        >
          <input
            ref={input => (this.input = input)}
            onKeyUp={this.handleKeyPress}
            placeholder="Enter keywords"
            className={bem.element('input')}
            type="text"
          />
          {currentQuery ? (
            <span className={bem.element('results-label')}>
              {`${currentHighlight + 1} of ${highlights.length}`}
            </span>
          ) : null}
          <button
            className={`${bem.element('button').modifiers({
              disabled: !currentQuery || currentHighlight === 0,
            })} material-icons`}
            onClick={() => this.props.dispatch(searchPrevCanvas())}
          >
            arrow_back
          </button>
          <button
            className={`${bem.element('button').modifiers({
              disabled:
                !currentQuery || currentHighlight + 1 === highlights.length,
            })} material-icons`}
            onClick={() => this.props.dispatch(searchNextCanvas())}
          >
            arrow_forward
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const searchState = state.search;
  const manifest = state.manifest.jsonLd;
  const canvases = manifest ? manifest.sequences[0].canvases || [] : [];
  const currentCanvas = state.manifest.currentCanvas;
  const currentQuery = state.search.currentQuery;
  const highlights =
    state.search &&
    state.search.currentQuery &&
    state.search.queries[state.search.currentQuery]
      ? Object.keys(state.search.queries[state.search.currentQuery].canvasMap)
      : [];
  const currentHighlight = canvases[currentCanvas]
    ? highlights.indexOf(canvases[currentCanvas]['@id'])
    : 0;

  return {
    currentQuery,
    searchAvailable: !!searchState.service,
    highlights,
    currentHighlight,
  };
}

export default connect(mapStateToProps)(withBemClass('search-box')(SearchBox));
