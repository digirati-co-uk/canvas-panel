import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import Viewer from '../Viewer/Viewer';
import './PopOutViewer.scss';

class PopOutViewer extends Component {
  state = { open: false };
  inner = React.createRef();

  componentDidMount() {
    this.attachEvents(this.inner);
  }

  attachEvents($el) {
    const $open = $el.querySelector('[data-open-viewer]');
    if ($open) {
      $open.addEventListener('click', () => {
        document.body.style = 'pointer-events: none';
        this.setState({
          open: true,
        });
      });
    }
  }

  close = () => {
    document.body.style = 'pointer-events: visible';
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { innerHtml, bem, ...props } = this.props;

    return (
      <div
        className={bem}
        style={{ pointerEvents: 'visible', overflow: 'hidden' }}
      >
        {open ? (
          <button className={bem.element('close')} onClick={this.close}>
            Exit
          </button>
        ) : null}
        {open ? <Viewer {...props} /> : null}
        <div
          className={bem.element('preview')}
          ref={ref => (this.inner = ref)}
          dangerouslySetInnerHTML={{ __html: innerHtml }}
        />
      </div>
    );
  }
}

export default withBemClass('pop-out-viewer')(PopOutViewer);
