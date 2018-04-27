import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../Title/Title';
import Close from '../Close/Close';
import ControlBar from '../ControlBar/ControlBar';
import Controls from '../Controls/Controls';
import Pager from '../Pager/Pager';
import IIIFLink from '../IIIFLink/IIIFLink';

class Header extends Component {
  render() {
    const { viewport, onClose } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <Title>{this.props.label}</Title>
        {onClose ? <Close onClose={onClose} /> : null}
        <ControlBar>
          <ControlBar.Left>
            <Pager>{this.props.canvasLabel}</Pager>
          </ControlBar.Left>
          <ControlBar.Right>
            {viewport ? (
              <Controls
                onZoomIn={() => viewport.zoomIn()}
                onZoomOut={() => viewport.zoomOut()}
              />
            ) : null}
            <IIIFLink />
          </ControlBar.Right>
        </ControlBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    label: state.manifest.jsonLd ? state.manifest.jsonLd.label : '',
    canvasLabel: state.canvas
      ? state.canvas.jsonLd ? state.canvas.jsonLd.label : ''
      : '',
  };
}

export default connect(mapStateToProps)(Header);
