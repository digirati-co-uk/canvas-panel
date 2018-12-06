import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as Manifesto from 'manifesto.js';
import functionOrMapChildren, {
  FunctionOrMapChildrenType,
} from '../../utility/functionOrMapChildren';

class AnnotationListProvider extends Component {
  state = { annotationLists: null };

  static propTypes = {
    // canvas: PropTypes.instanceOf(Manifesto.Canvas),
    children: FunctionOrMapChildrenType,
  };

  componentDidMount() {
    this.propsToState(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.canvas !== this.props.canvas) {
      this.propsToState(newProps);
    }
  }

  propsToState({ canvas }) {
    if (canvas) {
      this.setState({ annotationLists: null });
      canvas.getOtherContent().then(content => {
        this.setState({ annotationLists: content });
      });

      canvas.getAnnotations().then(annotations => {
        this.setState({ annotationLists: annotations });
      });
    }
  }

  render() {
    const { children, canvas, ...props } = this.props;
    const { annotationLists } = this.state;

    if (!canvas || !annotationLists) {
      return null;
    }

    return (
      <div>
        {annotationLists.map((annotationList, key) => (
          <div key={key}>
            {functionOrMapChildren(children, {
              canvas,
              annotationList,
              ...props,
            })}
          </div>
        ))}
      </div>
    );
  }
}

export default AnnotationListProvider;
