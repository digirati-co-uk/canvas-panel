import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import { connect } from 'react-redux';
import './Slider.scss';
import { manifestSetCanvas } from '../../redux/spaces/manifest';

class Slider extends Component {
  render() {
    const { bem, canvases, dispatch } = this.props;
    return (
      <div
        className={bem}
        style={{ display: 'flex', width: '100%', flexDirection: 'row' }}
      >
        {canvases
          ? canvases.map((canvas, index) => {
              return (
                <div
                  className={bem.element('image')}
                  style={{ flex: 1, flexShrink: 1, width: 'auto' }}
                >
                  <img
                    onClick={() => dispatch(manifestSetCanvas(index))}
                    style={{ width: '100%' }}
                    src={`${
                      canvas.images[0].resource.service['@id']
                    }/full/50,/0/default.jpg`}
                  />
                </div>
              );
            })
          : 'loading'}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const manifest = state.manifest.jsonLd;

  console.log(manifest);

  return {
    canvases: manifest ? manifest.sequences[0].canvases || [] : [],
  };
}

export default connect(mapStateToProps)(withBemClass('slider')(Slider));
