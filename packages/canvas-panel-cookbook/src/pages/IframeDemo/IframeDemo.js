import React from 'react';
import { withBemClass } from '@canvas-panel/core';
import PropTypes from 'prop-types';
import QueryStringProvider from '../../QueryStringProvider';

import './IframeDemo.scss';

class IframeDemoBase extends QueryStringProvider {
  render() {
    const { bem } = this.props;
    const src = this.urlParams.url;

    return <iframe src={src} className={bem} />;
  }
}

IframeDemoBase.propTypes = {
  url: PropTypes.string,
};

const IframeDemo = withBemClass('iframe-demo')(IframeDemoBase);

export default IframeDemo;
