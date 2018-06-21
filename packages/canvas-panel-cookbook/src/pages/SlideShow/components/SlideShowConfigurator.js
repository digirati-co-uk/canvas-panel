import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';

class SlideShowConfiguratorBase extends Component {
  render() {
    let { children, bem } = this.props;
    return (
      <div className={bem}>
        <div className={bem.element('panel')}>
          <form>
            <legend>Configuration</legend>
            <label>Manifest url</label>
            <input name="manifest" />
          </form>
        </div>
        <div className={bem.element('previews')}>{children}</div>
      </div>
    );
  }
}

const SlideShowConfigurator = withBemClass('slideshow-configurator')(
  SlideShowConfiguratorBase
);

export default SlideShowConfigurator;
