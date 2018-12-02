import React from 'react';
import PropTypes from 'prop-types';
import LocaleString from '../../manifesto/LocaleString/LocaleString';
import AnnotationSelector from '../../utility/AnnotationSelector';

class CanvasPosterViewport extends React.Component {
  getXYWHCanvasRelative = (annotation, width, height) => {
    const asSelector = AnnotationSelector.parse(annotation.target);
    if (!asSelector || asSelector.source === asSelector.id) {
      return {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      };
    }
    if (asSelector.selector.unit === 'pixel') {
      return {
        top: (asSelector.selector.x / width) * 100 + '%',
        left: (asSelector.selector.y / height) * 100 + '%',
        width: (asSelector.selector.width / width) * 100 + '%',
        height: (asSelector.selector.height / height) * 100 + '%',
      };
    } else if (asSelector.selector.unit === 'percent') {
      return {
        top: asSelector.selector.x + '%',
        left: asSelector.selector.y + '%',
        width: asSelector.selector.width + '%',
        height: asSelector.selector.height + '%',
      };
    }
  };

  render() {
    const { canvas, zoom, visibleAnnotations } = this.props;
    const { width, height } = canvas.__jsonld;

    return (
      <div
        style={{
          width: (this.props.width || width) * zoom,
          height: (this.props.height || height) * zoom,
          position: 'relative',
          background: 'lightgray',
        }}
      >
        {visibleAnnotations.map(annotation =>
          annotation.thumbnail ? (
            <img
              key={`annotation_el_${annotation.id}`}
              src={annotation.thumbnail[0].id}
              style={{
                position: 'absolute',
                ...this.getXYWHCanvasRelative(annotation, width, height),
              }}
            />
          ) : (
            <div
              key={`annotation_el_${annotation.id}`}
              style={{
                position: 'absolute',
                border: '2px dashed red',
                ...this.getXYWHCanvasRelative(annotation, width, height),
              }}
            >
              <LocaleString>{annotation.label}</LocaleString>
            </div>
          )
        )}
      </div>
    );
  }
}

CanvasPosterViewport.defaultProps = {
  zoom: 0.2,
};

export default CanvasPosterViewport;
