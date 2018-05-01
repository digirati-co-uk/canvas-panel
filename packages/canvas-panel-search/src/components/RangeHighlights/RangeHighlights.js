import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { connect } from 'react-redux';
import './RangeHighlights.scss';
import { selectHighlights } from '../../redux/search.selectors';

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

export default connect(selectHighlights)(
  withBemClass('range-highlights')(RangeHighlights)
);
