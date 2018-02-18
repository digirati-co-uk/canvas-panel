import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Slider.scss';
import { manifestSetCanvas } from '../../redux/spaces/manifest';
import RangeSlider from 'react-rangeslider';

class Slider extends Component {
  state = { value: 0 };

  handleOnChange = value => {
    this.setState({ value });
  };

  componentWillReceiveProps(newProps) {
    if (newProps.currentCanvas !== this.state.value) {
      this.setState({ value: newProps.currentCanvas });
    }
  }

  handleOnChangeComplete = () => {
    this.props.dispatch(manifestSetCanvas(this.state.value));
  };

  render() {
    const { canvases, currentCanvas } = this.props;

    return (
      <div style={{ flex: 1 }}>
        <RangeSlider
          value={this.state.value || currentCanvas}
          onChange={this.handleOnChange}
          onChangeComplete={this.handleOnChangeComplete}
          max={canvases.length}
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

export default connect(mapStateToProps)(Slider);
