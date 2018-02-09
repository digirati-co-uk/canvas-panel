import React from 'react';
import * as PropTypes from 'prop-types';

export default function functionOrMapChildren(children, withProps) {
  if (children && children.constructor && children.call && children.apply) {
    return (
      children(withProps) || <div>Could not render children from function</div>
    );
  }

  return (
    <div>
      {React.Children.map(children, child => {
        return React.cloneElement(child, withProps);
      }) || <div>Could not clone children</div>}
    </div>
  );
}

export const FunctionOrMapChildrenType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]);
