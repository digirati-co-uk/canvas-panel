import React, { Component } from 'react';

class Pager extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default Pager;
