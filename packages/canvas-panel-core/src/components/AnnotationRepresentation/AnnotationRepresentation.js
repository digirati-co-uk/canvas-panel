import React, { Component } from 'react';
import CanvasRepresentation from '../CanvasRepresentation/CanvasRepresentation';
import Annotation from '../Annotation/Annotation';

class AnnotationRepresentation extends Component {
  render() {
    const {
      annotations,
      onClickAnnotation,
      annotationStyle,
      ...props
    } = this.props;
    return (
      <CanvasRepresentation {...props}>
        {annotations.map(({ annotation, on }, key) => (
          <Annotation
            key={key}
            x={on.selector.x}
            y={on.selector.y}
            height={on.selector.height}
            width={on.selector.width}
            annotation={annotation}
            style={annotationStyle}
            onClick={onClickAnnotation}
          />
        ))}
      </CanvasRepresentation>
    );
  }
}

export default AnnotationRepresentation;
