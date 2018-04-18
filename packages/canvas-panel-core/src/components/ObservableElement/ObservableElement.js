/**
 * @flow
 */
import React, { Component } from 'react';

type Props = {
  observer: (state: { [string]: any }) => void,
  initialProps: { [string]: any },
  render: any,
};

class ObservableElement extends Component<Props> {
  componentDidMount() {
    if (this.props.observer) {
      this.props.observer(newState => this.setState(newState));
    }
    this.setState(() => this.props.initialProps);
  }

  render() {
    const Element = this.props.render;
    return <Element {...this.state} />;
  }
}

export default ObservableElement;
