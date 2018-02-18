import React, { Component } from 'react';
import { connect } from 'react-redux';
import { manifestSetCanvas } from '../../redux/spaces/manifest';
import './RangeSlider.scss';
import Rheostat from 'rheostat';

class RangeSlider extends Component {
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
      <div style={{ flex: 1 }}>
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

function mapStateToProps(state) {
  const manifest = state.manifest.jsonLd;
  return {
    currentCanvas: state.manifest.currentCanvas,
    canvases: manifest ? manifest.sequences[0].canvases || [] : [],
  };
}

export default connect(mapStateToProps)(RangeSlider);
