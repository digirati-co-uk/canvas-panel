import React, { Component } from 'react';

class TimelineTooltip extends Component {
  setElement(el) {
    const { getElement } = this.props;
    if (getElement) {
      getElement(el);
    }
  }

  render() {
    const { bem, active, children } = this.props;
    return (
      <div className={bem.element('tooltip')}>
        <div
          ref={el => this.setElement(el)}
          className={bem.element('tooltip-float').modifiers({ active })}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default TimelineTooltip;
