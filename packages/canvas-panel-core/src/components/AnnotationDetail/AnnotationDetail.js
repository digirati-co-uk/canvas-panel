import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as Manifesto from 'manifesto.js';

class AnnotationDetail extends Component {
  static propTypes = {
    annotation: PropTypes.instanceOf(Manifesto.Annotation),
    onClose: PropTypes.func,
  };

  render() {
    const { annotation, onClose } = this.props;
    const resource = annotation.getResource();

    if (resource && resource.getProperty('within')) {
      const toDisplay = resource.getProperty('within');
      return (
        <div>
          <h1>{toDisplay.label}</h1>
          <p>{toDisplay.description}</p>
          {onClose ? <button onClick={onClose}>close</button> : null}
        </div>
      );
    }

    return (
      <div>
        <h1>{annotation.getLabel()}</h1>
        <p>{annotation.getProperty('description')}</p>
        {onClose ? <button onClick={onClose}>close</button> : null}
      </div>
    );
  }
}

export default AnnotationDetail;
