import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Manifesto from 'manifesto.js';
import AnnotationSelector from '../../utility/AnnotationSelector';

class Annotation extends Component {

  static propTypes = {
    annotation: PropTypes.instanceOf(Manifesto.Annotation),
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  };

  handleClick = (e) => this.props.onClick ? this.props.onClick(this.props.annotation, this.props.on, e) : null;

  render() {
    const {style} = this.props;

    return (
      <div
        style={{ outline: '1px solid orange', ...style }}
        onClick={this.handleClick}
      />
    );
  }
}

export default Annotation;