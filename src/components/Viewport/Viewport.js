import React, {Component} from 'react';

class Viewport extends Component {

  state = {
    x: 0,
    y: 0,
    zoom: 1,
    scale: 1,
    rotation: 0,
  };

  onUpdateViewport = ({ x, y, zoom, scale, rotation }) => {
    this.setState({
      x, y, zoom, scale, rotation
    });
  };

  render() {
    const {x, y, zoom, scale, rotation} = this.state;
    const { maxWidth, children, ...props } = this.props;

    return (
        <div style={{ maxWidth, position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
          {
            React.Children.map(children, child => {
              if (child.props.viewportController === true) {
                return React.cloneElement(child, { getPosition: this.onUpdateViewport, maxWidth, ...props })
              }
              const ratio = child.props.ratio || 1;
              return React.cloneElement(child, {
                style: {
                  transform: `translate(${x}px,${y}px) scale(${zoom * scale / ratio}) rotate(${rotation})`,
                  transformOrigin: '0 0 0',
                  ...child.props.style,
                  width: this.props.width * ratio,
                  height: this.props.height * ratio,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                },
                position: {x: x* ratio, y: y * ratio, zoom, scale: scale / ratio, rotation},
                maxWidth,
                ...props
              });
            })
          }
        </div>
    );
  }

}


export default Viewport;