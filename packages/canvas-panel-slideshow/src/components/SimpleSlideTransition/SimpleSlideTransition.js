import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SimpleSlideTransition.scss';

class SimpleSlideTransition extends Component {
  scroll = window.scrollY;

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.id !== this.props.id) {
      this.scroll = window.scrollY;
    }
  }

  setScroll = () => {
    window.scrollTo(0, this.scroll);
  };

  render() {
    const { children, id, bem, timeout = 500 } = this.props;

    return (
      <TransitionGroup className={bem} onExiting={this.setScroll}>
        <CSSTransition
          key={id}
          timeout={timeout}
          classNames="fade"
          onExiting={this.setScroll}
        >
          <div style={{ height: '100%', width: '100%' }}>{children}</div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withBemClass('slide-transitions')(SimpleSlideTransition);
