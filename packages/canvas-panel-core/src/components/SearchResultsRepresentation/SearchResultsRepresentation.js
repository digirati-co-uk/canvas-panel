import React, { Component } from 'react';
import AnnotationRepresentation from '../AnnotationRepresentation/AnnotationRepresentation';

class SearchResultsRepresentation extends Component {
  render() {
    const { search, canvas, ...props } = this.props;
    return (
      <div>
        <AnnotationRepresentation
          {...props}
          annotations={search.results.getAnnotations(canvas.id)}
        />
      </div>
    );
  }
}

export default SearchResultsRepresentation;
