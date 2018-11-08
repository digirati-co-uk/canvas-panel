import React, { Component } from 'react';
import Measure from 'react-measure';
import Viewport from '../Viewport/Viewport';

class SizedViewport extends Component {
  state = {
    dimensions: {
      width: -1,
      height: -1,
    },
  };

  render() {
    const { style, ...props } = this.props;
    const { width, height } = this.state.dimensions;

    // @todo part of the layout problem.
    if (!style.height) {
      style.height = '100%';
    }

    return (
      <Measure
        bounds
        onResize={contentRect => {
          this.setState({ dimensions: contentRect.bounds });
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} style={style}>
            <Viewport maxHeight={height} maxWidth={width} {...props}>
              {this.props.children}
            </Viewport>
          </div>
        )}
      </Measure>
    );
  }
}

export default SizedViewport;
