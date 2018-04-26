import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { connect } from 'react-redux';
import './RangeHighlights.scss';

function highlightBox(flex, canvas = null, current = false) {
  return { flex, canvas, current };
}

class RangeHighlights extends Component {
  shouldComponentUpdate(newProps) {
    return (
      newProps.currentQuery !== this.props.currentQuery ||
      newProps.currentCanvas !== this.props.currentCanvas ||
      newProps.currentHighlight !== this.props.currentHighlight ||
      newProps.highlights !== this.props.highlights
    );
  }

  getHighlights() {
    const { canvases, highlights, currentCanvas } = this.props;

    return canvases.reduce(
      (state, canvas, key) => {
        if (highlights.indexOf(canvas['@id']) >= 0) {
          state.toRender.push(highlightBox(state.currentAcc));
          state.toRender.push(highlightBox(1, canvas, currentCanvas === key));
          state.currentAcc = 0;
          return state;
        }
        if (key === canvases.length - 1) {
          state.toRender.push(highlightBox(state.currentAcc));
          return state;
        }
        state.currentAcc += 1;
        return state;
      },
      {
        toRender: [],
        currentAcc: 0,
      }
    ).toRender;
  }

  render() {
    const { bem } = this.props;

    return (
      <div className={bem}>
        {this.getHighlights().map(({ flex, canvas, current }, key) => {
          return (
            <div className={bem.element('item')} key={key} style={{ flex }}>
              {canvas ? (
                <span
                  className={`${bem.element('icon').modifiers({
                    current,
                  })} material-icons`}
                >
                  arrow_drop_down
                </span>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const manifest = state.manifest.jsonLd;
  const canvases = manifest ? manifest.sequences[0].canvases || [] : [];
  const currentCanvas = state.manifest.currentCanvas;
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
    currentCanvas,
    canvases,
    currentHighlight,
    highlights,
  };
}

export default connect(mapStateToProps)(
  withBemClass('range-highlights')(RangeHighlights)
);
