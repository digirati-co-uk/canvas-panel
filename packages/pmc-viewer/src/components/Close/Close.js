import React, { Component } from 'react';

class Close extends Component {
  render() {
    return (
      <div
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
