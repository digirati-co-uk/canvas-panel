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

  refNode: any;

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
    if (!this.refNode) {
      console.error(
        'BREAKING CHANGE: to use fullscreen component you must use the passed in `ref` property'
      );
      return;
    }
    const node = ReactDOM.findDOMNode(this.refNode);
    if (node) {
      screenfull.request(node);
    }
  };

  setRef = (refNode: any) => {
    this.refNode = refNode;
  };

  exitFullscreen = () => {
    if (!this.refNode) {
      console.error(
        'BREAKING CHANGE: to use fullscreen component you must use the passed in `ref` property'
      );
      return;
    }
    const node = ReactDOM.findDOMNode(this.refNode);
    if (node) {
      screenfull.exit(node);
    }
  };

  render() {
    const { children, ...props } = this.props;
    const { isFullscreen } = this.state;

    return functionOrMapChildren(children, {
      fullscreenEnabled: screenfull.enabled,
      isFullscreen,
      toggleFullscreen: this.toggleFullscreen,
      goFullscreen: this.goFullscreen,
      exitFullscreen: this.exitFullscreen,
      ref: this.setRef,
      ...props,
    });
  }
}

export default Fullscreen;
