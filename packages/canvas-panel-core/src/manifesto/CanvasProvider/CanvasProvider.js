import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import LocaleString from '../LocaleString/LocaleString';
import functionOrMapChildren, {
  FunctionOrMapChildrenType,
} from '../../utility/functionOrMapChildren';

type Props = {
  sequence?: number,
  startCanvas?: number | string,
  manifest: Manifesto.Manifest,
  children: any,
};

class CanvasProvider extends Component<Props> {
  state = {
    currentCanvas: null,
  };

  static defaultProps = {
    sequence: 0,
    startCanvas: 0,
  };

  static NEXT_CANVAS = 'NEXT_CANVAS';
  static PREV_CANVAS = 'PREV_CANVAS';

  componentWillReceiveProps(newProps) {
    if (newProps.currentCanvas !== this.props.currentCanvas) {
      const sequence = newProps.manifest.getSequenceByIndex(newProps.sequence);
      this.setState({
        currentCanvas: Number.isInteger(newProps.currentCanvas)
          ? newProps.currentCanvas
          : sequence.getCanvasIndexById(),
      });
    }
  }

  static reducer(state, action) {
    switch (action.type) {
      case CanvasProvider.NEXT_CANVAS:
        return { ...state, currentCanvas: state.currentCanvas + 1 };
      case CanvasProvider.PREV_CANVAS:
        return {
          ...state,
          currentCanvas:
            state.currentCanvas === 0 ? 0 : state.currentCanvas - 1,
        };
    }
    return state;
  }

  static nextCanvas() {
    return { type: CanvasProvider.NEXT_CANVAS };
  }

  static prevCanvas() {
    return { type: CanvasProvider.PREV_CANVAS };
  }

  componentWillMount() {
    if (this.props.startCanvas !== this.state.currentCanvas) {
      this.setState({ currentCanvas: this.props.startCanvas });
    }
  }

  dispatch = action => {
    this.setState(CanvasProvider.reducer(this.state, action));
  };

  render() {
    const { manifest, startCanvas, children } = this.props;
    const { currentCanvas } = this.state;

    const sequence = manifest.getSequenceByIndex(this.props.sequence);
    const canvas = Number.isInteger(currentCanvas)
      ? sequence.getCanvasByIndex(currentCanvas)
      : sequence.getCanvasById(currentCanvas);

    return functionOrMapChildren(children, {
      manifest,
      sequence,
      canvas,
      startCanvas,
      currentCanvas,
      dispatch: this.dispatch,
      width: canvas.getWidth(),
      height: canvas.getHeight(),
    });
  }
}

export default CanvasProvider;
