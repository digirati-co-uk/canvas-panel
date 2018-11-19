/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { manifestSetCanvas } from '@canvas-panel/redux/es/spaces/manifest';
import './RangeSlider.scss';
import 'rheostat/initialize';
import Rheostat from 'rheostat';
import RangeHighlights from '../RangeHighlights/RangeHighlights';
import { selectCurrentCanvas } from '../../redux/search.selectors';

type Props = {
  currentCanvas: number,
  canvases: Array<any>,
  currentQuery: string,
  highlights: Array<string>,
  dispatch: any => void,
  currentHighlight: number,
};

type State = {
  value: number,
};

class RangeSlider extends Component<Props, State> {
  state = { value: 0 };
  clicked = false;

  handleOnChange = ({ values: [a, b] }) => {
    const value = a > 0 ? a : b;
    if (this.clicked) {
      this.props.dispatch(manifestSetCanvas(value));
      this.clicked = false;
    }
    this.setState(() => ({ value }));
  };

  componentWillReceiveProps(newProps) {
    if (newProps.currentCanvas !== this.state.value) {
      this.setState({ value: newProps.currentCanvas });
    }
  }

  handleOnChangeComplete = () => {
    this.clicked = true;
    this.props.dispatch(manifestSetCanvas(this.state.value));
  };

  render() {
    const { canvases } = this.props;

    return (
      <div className="range-slider">
        <RangeHighlights canvases={canvases} />
        <Rheostat
          min={0}
          max={canvases.length - 1}
          values={[0, this.state.value]}
          onValuesUpdated={this.handleOnChange}
          onClick={this.handleOnChangeComplete}
          onSliderDragEnd={this.handleOnChangeComplete}
          handle={props => {
            if (props['data-handle-key'] === 0) return null;
            return <button {...props} />;
          }}
        />
      </div>
    );
  }
}

export default connect(selectCurrentCanvas)(RangeSlider);
