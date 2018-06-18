import React, { Component } from 'react';
import { functionOrMapChildren, withBemClass } from '@canvas-panel/core';
import './Container.scss';
import getCurrentScrollY from '../../utils/getCurrentScrollY';

class Container extends Component {
  lastScrollY = -1;
  scheduledAnimationFrame = false;
  state = { current: 0 };

  static defaultProps = {
    windowHeight: window.innerHeight,
    onLoadDelay: 500,
  };

  componentWillMount() {
    this.setState(() => ({
      // Double tilde quicker than Math.floor, useful for scroll events.
      current: ~~(this.lastScrollY / this.props.windowHeight),
    }));
  }

  componentWillReceiveProps(newProps, nextContext) {
    if (newProps.windowHeight !== this.props.windowHeight) {
      this.setState(() => ({
        // Double tilde quicker than Math.floor, useful for scroll events.
        current: ~~(this.lastScrollY / newProps.windowHeight),
      }));
    }
  }

  componentDidMount() {
    this.props
      .getContainer()
      .addEventListener('scroll', this.handleScrollThrottled);

    // Set timeout, configured with load delay setting.
    setTimeout(() => {
      this.props.updateIndividual(
        getCurrentScrollY(this.props.getContainer()) / this.props.windowHeight
      );
    }, this.props.onLoadDelay);
  }

  componentWillUnmount() {
    this.props
      .getContainer()
      .removeEventListener('scroll', this.handleScrollThrottled);
  }

  handleScrollThrottled = () => {
    // Store the scroll value for later.
    this.lastScrollY = getCurrentScrollY(this.props.getContainer());

    // Prevent multiple rAF callbacks.
    if (this.scheduledAnimationFrame) {
      return;
    }

    this.scheduledAnimationFrame = true;
    requestAnimationFrame(this.handleScroll);
  };

  handleScroll = () => {
    this.scheduledAnimationFrame = false;
    const currentAccurate = this.lastScrollY / this.props.windowHeight;
    // Double tilde quicker than Math.floor, useful for scroll events.
    const current = ~~currentAccurate;
    this.props.updateIndividual(currentAccurate);
    if (current !== this.state.current) {
      this.setState(() => ({
        current,
      }));
    }
  };

  render() {
    const { children, bem, style, disabled, ...props } = this.props;
    const { current } = this.state;

    return (
      <div className={bem.modifiers({ disabled })} style={style}>
        {functionOrMapChildren(children, { ...props, current })}
      </div>
    );
  }
}

export default withBemClass('full-page-container')(Container);
