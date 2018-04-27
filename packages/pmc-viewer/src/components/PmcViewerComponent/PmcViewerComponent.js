import React, { Component } from 'react';
import { withBemClass } from '../../../../canvas-panel-core/es/index';
import App from '../../App';
import './PmcViewerComponent.scss';

class PmcViewerPopOutComponent extends Component {
  state = {
    isOpen: false,
  };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  render() {
    const { isOpen } = this.state;
    const { text, bem, ...props } = this.props;

    return (
      <div className={bem}>
        <span onClick={this.open} className={bem.element('trigger')}>
          {text}
        </span>
        <div className={bem.element('viewer').modifiers({ isOpen })}>
          <App onClose={this.close} {...props} />
        </div>
      </div>
    );
  }
}

export default withBemClass('pmc-viewer-component')(PmcViewerPopOutComponent);
