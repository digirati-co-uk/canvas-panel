import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './AnnotationNavigation.scss';

class AnnotationNavigation extends Component {
  render() {
    const { bem, onPrevious, onNext } = this.props;
    return (
      <div className={bem}>
        <button
          onClick={onPrevious}
          className={bem
            .element('previous')
            .modifiers({ disabled: !onPrevious })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -256 1792 1792"
            style={{
              height: 10,
              marginRight: 5,
              transform: 'rotate(180deg) translateY(-1px)',
            }}
          >
            <path
              d="M1448.288 626.983q0 52-37 91l-652 651q-37 37-90 37t-90-37l-76-75q-37-39-37-91 0-53 37-90l486-486-486-485q-37-39-37-91 0-53 37-90l76-75q36-38 90-38t90 38l652 651q37 37 37 90z"
              fill="currentColor"
            />
          </svg>
          Prev
        </button>
        <button
          onClick={onNext}
          className={bem.element('next').modifiers({ disabled: !onNext })}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -256 1792 1792"
            style={{
              marginLeft: 5,
              height: 10,
              transform: 'translateY(1px)',
            }}
          >
            <path
              d="M1448.288 626.983q0 52-37 91l-652 651q-37 37-90 37t-90-37l-76-75q-37-39-37-91 0-53 37-90l486-486-486-485q-37-39-37-91 0-53 37-90l76-75q36-38 90-38t90 38l652 651q37 37 37 90z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    );
  }
}

export default withBemClass('annotation-navigation')(AnnotationNavigation);
