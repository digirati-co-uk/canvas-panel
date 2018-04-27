import React, { Component } from 'react';

class Close extends Component {
  render() {
    const { onClose } = this.props;
    return (
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 10,
          right: 20,
          fontSize: '2em',
          lineHeight: '1.6em',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        &times;
      </div>
    );
  }
}

export default Close;
