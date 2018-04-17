import React, { Component } from 'react';

class ObservableElement extends Component {
  componentDidMount() {
    if (this.props.observe) {
      this.props.observe(newState => this.setState(newState));
    }
    this.setState(() => this.props.initialProps);
  }

  render() {
    const Element = this.props.render;
    return <Element {...this.state} />;
  }
}

export default ObservableElement;
