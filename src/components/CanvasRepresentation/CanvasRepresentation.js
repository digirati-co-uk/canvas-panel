import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Manifesto from 'manifesto.js';

class CanvasRepresentation extends Component {

  static propTypes = {
    canvas: PropTypes.oneOfType(Manifesto.Canvas)
  };

  static defaultProps = {
    maxWidth: 500,
    ratio: 1,
  };

  render() {
    const {canvas, style, ratio, children, ...props} = this.props;

    const canvasHeight = canvas.getHeight();
    const canvasWidth = canvas.getWidth();


    return (
        <div style={{
          position: 'relative',
          height: canvasHeight * ratio,
          width: canvasWidth * ratio,
          ...style,
        }}>
          {
            React.Children.map(children, child => {
              return React.cloneElement(child, {
                canvas,
                style: {
                  ...child.props.style,
                  position: 'absolute',
                  top: child.props.top * ratio,
                  left: child.props.left * ratio,
                  height: child.props.height * ratio,
                  width: child.props.width * ratio,
                },
                ...props,
              })
            })
          }
        </div>
    )
  }
}

export default CanvasRepresentation;
