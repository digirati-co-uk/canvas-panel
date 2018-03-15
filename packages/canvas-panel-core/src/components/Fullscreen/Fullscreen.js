/**
 * @flow
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import screenfull from 'screenfull';
import functionOrMapChildren from '../../utility/functionOrMapChildren';
import Fullscreenable from 'react-fullscreenable';

class Fullscreen extends Component<any, any> {
  static defaultProps = {
    isFullscreen: false,
    toggleFullscreen: () => {},
  };

  toggleFullscreen = () => {
    this.props.toggleFullscreen();
  };

  goFullscreen = () => {
    if (this.isFullscreen === false) {
      this.props.toggleFullscreen();
    }
  };

  exitFullscreen = () => {
    if (this.isFullscreen === true) {
      this.props.toggleFullscreen();
    }
  };

  render() {
    const { children, isFullscreen, ...props } = this.props;

    return functionOrMapChildren(children, {
      fullscreenEnabled: true,
      isFullscreen,
      toggleFullscreen: this.toggleFullscreen,
      goFullscreen: this.goFullscreen,
      exitFullscreen: this.exitFullscreen,
      ...props,
    });
  }
}

export default Fullscreenable()(Fullscreen);
