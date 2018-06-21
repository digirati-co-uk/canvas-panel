import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SimpleSlideTransition.scss';

let cnt = 0;
const SimpleSlideTransition = props => {
  let { children } = props;
  return (
    <TransitionGroup className="slide-transitions">
      <CSSTransition key={cnt++} timeout={500} classNames="fade">
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default SimpleSlideTransition;
