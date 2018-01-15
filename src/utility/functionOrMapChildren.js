import React from 'react';
import PropTypes from 'prop-types';

export default function functionOrMapChildren(children, withProps) {
  if (children && children.constructor && children.call && children.apply) {
    return children(withProps);
  }

  return React.Children.map(children, child => {
    return React.cloneElement(child, withProps)
  })
}

export const FunctionOrMapChildrenType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
]);
