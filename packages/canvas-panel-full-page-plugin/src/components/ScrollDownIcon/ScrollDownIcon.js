import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './ScrollDownIcon.scss';
import getCurrentScrollY from '../../utils/getCurrentScrollY';

class ScrollDownIcon extends Component {
  state = { hidden: false };

  componentWillMount() {
    window.addEventListener('scroll', this.onScroll);
    if (getCurrentScrollY() > 100) {
      this.setState({ hidden: true });
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  onScroll = () => {
    if (getCurrentScrollY() > 100) {
      this.setState({ hidden: true });
      window.removeEventListener('scroll', this.onScroll);
    }
  };

  render() {
    const { hidden } = this.state;
    const { bem } = this.props;
    return <div className={bem.modifiers({ hidden })} />;
  }
}

export default withBemClass('scroll-down-icon')(ScrollDownIcon);
