import React from 'react';
import { withBemClass } from '@canvas-panel/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SimpleSlideTransition.scss';

const SimpleSlideTransition = ({ children, id, bem, timeout = 500 }) => (
  <TransitionGroup className={bem}>
    <CSSTransition key={id} timeout={timeout} classNames="fade">
      {children}
    </CSSTransition>
  </TransitionGroup>
);

export default withBemClass('slide-transitions')(SimpleSlideTransition);
