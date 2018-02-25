/**
 * @flow
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import screenfull from 'screenfull';
import functionOrMapChildren from '../../utility/functionOrMapChildren';

type State = {
  isFullscreen: boolean,
};

class Fullscreen extends Component<any, State> {
  state = {
    isFullscreen: false,
  };

  handleChangeFullScreenState = () => {
    this.setState(() => ({ isFullscreen: screenfull.isFullscreen }));
  };

  componentWillMount() {
    if (screenfull.on) {
      screenfull.on('change', this.handleChangeFullScreenState);
    }
  }

  componentWillUnmount() {
    if (screenfull.off) {
      screenfull.off('change', this.handleChangeFullScreenState);
    }
  }

  toggleFullscreen = () => {
    if (this.state.isFullscreen) {
      this.exitFullscreen();
    } else {
      this.goFullscreen();
    }
  };

  goFullscreen = () => {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      screenfull.request(node);
    }
  };

  exitFullscreen = () => {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      screenfull.exit(node);
    }
  };

  render() {
    const { children, ...props } = this.props;
    const { isFullscreen } = this.state;

    return functionOrMapChildren(children, {
      isFullscreen,
      toggleFullscreen: this.toggleFullscreen,
      goFullscreen: this.goFullscreen,
      exitFullscreen: this.exitFullscreen,
      ...props,
    });
  }
}

export default Fullscreen;
