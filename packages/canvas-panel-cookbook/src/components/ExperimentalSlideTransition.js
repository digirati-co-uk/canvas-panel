import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ExperimentalSlideTransition.scss';

class PageTransition extends Component {
  state = {
    animationCache: '',
    direction: 0,
  };
  constructor(props) {
    super(props);
  }

  componentWillUpdate(nextProps, nextState) {
    let transitionEl = document.querySelector('.transition');
    let oldState = document.querySelector('.transition__children');
    let direction = nextProps.currentCanvas - this.props.currentCanvas;
    this.state.animationCache = oldState.innerHTML;
    this.state.direction = nextState.direction = direction;
    if (direction !== 0) {
      setTimeout(() => {
        transitionEl.classList.add(
          'transition' + (direction > 0 ? '--forward' : '--backward')
        );
      }, 0);
    }
  }
  render() {
    let { children, bem } = this.props;
    let { animationCache } = this.state;
    return (
      <div className={bem}>
        <div className={bem.element('children')}>{children}</div>
        <div
          className={bem.element('animation')}
          dangerouslySetInnerHTML={{
            __html: animationCache,
          }}
        />
      </div>
    );
  }
}

const ExperimentalSlideTransition = withBemClass('transition')(PageTransition);

export default ExperimentalSlideTransition;
