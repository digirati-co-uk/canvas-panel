import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import { FunctionOrMapChildrenType } from '../../utility/functionOrMapChildren';
import functionOrMapChildren from '../../utility/functionOrMapChildren';
import parseSelectorTarget from '../../utility/parseSelectorTarget';
import AnnotationSelector from '../../utility/AnnotationSelector';

class AnnotationProvider extends Component {
  static propTypes = {
    canvas: PropTypes.instanceOf(Manifesto.Canvas),
    children: FunctionOrMapChildrenType,
  };

  static parseAnnotation(annotation) {
    const on = annotation.getOn() || annotation.getTarget();
    return {
      on: AnnotationSelector.parse(on),
    };
  }

  render() {
    const { children, annotationList, ...props } = this.props;

    if (!annotationList) {
      return null;
    }

    const parsedList = annotationList.getResources().map(annotation => ({
      annotationList,
      annotation,
      ...AnnotationProvider.parseAnnotation(annotation),
    }));

    return functionOrMapChildren(children, {
      annotationList,
      annotations: parsedList,
      ...props,
    });
  }
}

export default AnnotationProvider;
