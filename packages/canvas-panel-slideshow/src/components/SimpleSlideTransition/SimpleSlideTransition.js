import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SimpleSlideTransition.scss';

class SimpleSlideTransition extends Component {
  render() {
    const { children, id, bem, timeout = 500 } = this.props;
    return (
      <TransitionGroup className={bem}>
        <CSSTransition
          key={id}
          timeout={{
            enter: 1000,
            exit: 1000,
          }}
          classNames="fade"
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withBemClass('slide-transitions')(SimpleSlideTransition);
