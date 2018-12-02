import React from 'react';
import PropTypes, { any } from 'prop-types';
import functionOrMapChildren from '../../utility/functionOrMapChildren';

const MultipleTileSources = ({
  canvas,
  children,
  annotationFilter,
  ...props
}) =>
  functionOrMapChildren(children, {
    props,
    canvas,
    visibleAnnotations: (canvas.__jsonld.items || []).reduce(
      (_annotations, annotationPage) => {
        _annotations = _annotations.concat(
          (annotationPage.items || [])
            .filter(resource => resource.type === 'Annotation')
            .filter(annotationFilter)
        );
        return _annotations;
      },
      []
    ),
  });

MultipleTileSources.propTypes = {
  children: PropTypes.func.isRequired,
  canvas: PropTypes.object.isRequired,
  annotationFilter: PropTypes.func,
};

MultipleTileSources.defaultProps = {
  annotationFilter: () => true,
};

export default MultipleTileSources;
