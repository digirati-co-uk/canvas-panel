import React, { Component } from 'react';
import CanvasRepresentation from '../CanvasRepresentation/CanvasRepresentation';
import Annotation from '../Annotation/Annotation';

class AnnotationRepresentation extends Component {
  render() {
    const {
      annotations,
      onClickAnnotation,
      annotationClassName,
      annotationStyle,
      growthStyle,
      ...props
    } = this.props;
    return (
      <CanvasRepresentation {...props}>
        {annotations.map(({ annotation, on }, key) => {
          return (
            <Annotation
              key={key}
              x={on.selector.x}
              y={on.selector.y}
              height={on.selector.height}
              width={on.selector.width}
              annotation={annotation}
              style={annotationStyle}
              className={annotationClassName}
              onClick={onClickAnnotation}
              growthStyle={growthStyle}
            />
          );
        })}
      </CanvasRepresentation>
    );
  }
}

export default AnnotationRepresentation;
