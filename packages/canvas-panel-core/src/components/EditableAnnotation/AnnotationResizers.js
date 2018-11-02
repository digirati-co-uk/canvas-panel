import React from 'react';
import PropTypes from 'prop-types';

const AUTO = 'auto';

//TODO: Maybe convert it React.memo 'pure function' if we upgrade to 16.6...
class AnnotationResizers extends React.PureComponent {
  static propTypes = {
    resizerWidth: PropTypes.number,
    resizeStart: PropTypes.func.isRequired,
    directions: PropTypes.array,
  };

  static defaultProps = {
    resizerWidth: 10,
    directions: ['se', 'ne', 'sw', 'nw', 's', 'e', 'n', 'w'],
  };

  createResizers = (width, directions) => {
    return Object.entries(
      directions.reduce((resizers, direction) => {
        switch (direction) {
          case 'se':
          case 'ne':
          case 'sw':
          case 'nw':
            // corners
            resizers[direction] = {
              top: direction.startsWith('s') ? AUTO : 0,
              bottom: direction.startsWith('s') ? 0 : AUTO,
              left: direction.endsWith('e') ? AUTO : 0,
              right: direction.endsWith('e') ? 0 : AUTO,
              width: width,
              height: width,
              cursor: `${direction}-resize`,
            };
            break;
          case 'e':
          case 'w':
            // horizontal resizers with vertical boxes
            resizers[direction] = {
              top: width,
              right: direction === 'e' ? 0 : AUTO,
              left: direction === 'e' ? AUTO : 0,
              bottom: width,
              width: width,
              height: AUTO,
              cursor: `${direction}-resize`,
            };
            break;
          case 'n':
          case 's':
            // vertical resizers with horizontal boxes
            resizers[direction] = {
              top: direction === 's' ? AUTO : 0,
              bottom: direction === 's' ? 0 : AUTO,
              left: width,
              right: width,
              width: AUTO,
              height: width,
              cursor: `${direction}-resize`,
            };
            break;
        }
        return resizers;
      }, {})
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.createResizers(
          this.props.resizerWidth,
          this.props.directions
        ).map(([direction, styles]) => (
          <div
            key={direction}
            style={{
              ...styles,
              //TODO: add custom styles or bem, need to pick a direction...
              position: 'absolute',
            }}
            onMouseDown={this.props.resizeStart(direction)}
            onTouchStart={this.props.resizeStart(direction)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default AnnotationResizers;
