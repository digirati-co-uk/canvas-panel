import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import AnnotationListProvider from '../../manifesto/AnnotationListProvider/AnnotationListProvider';
import AnnotationProvider from '../../manifesto/AnnotationProvider/AnnotationProvider';
import AnnotationRepresentation from '../AnnotationRepresentation/AnnotationRepresentation';

class AnnotationCanvasRepresentation extends Component {
  static propTypes = {
    annotationStyle: PropTypes.object,
    onClickAnnotation: PropTypes.func,
    growthStyle: PropTypes.oneOf(['fixed', 'scaled', 'absolute']),
  };

  static defaultProps = {
    annotationStyle: {},
  };

  render() {
    const {
      annotationStyle,
      growthStyle,
      onClickAnnotation,
      ...props
    } = this.props;

    return (
      <AnnotationListProvider {...props}>
        <AnnotationProvider>
          <AnnotationRepresentation
            onClickAnnotation={onClickAnnotation}
            annotationStyle={annotationStyle}
            growthStyle={growthStyle}
          />
        </AnnotationProvider>
      </AnnotationListProvider>
    );
  }
}

export default AnnotationCanvasRepresentation;
