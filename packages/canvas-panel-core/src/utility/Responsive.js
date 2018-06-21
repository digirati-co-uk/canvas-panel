import React, { PureComponent } from 'react';
import MobileDetect from 'mobile-detect';
import functionOrMapChildren from './functionOrMapChildren';

const md = new MobileDetect(window.navigator.userAgent);

class Responsive extends PureComponent {
  md = md;

  static isMobile() {
    return !!md.phone();
  }

  render() {
    const {
      tabletDown,
      phoneOnly,
      tabletOnly,
      desktopOnly,
      is,
      children,
      ...props
    } = this.props;

    if ((tabletDown && phoneOnly) || (tabletDown && tabletOnly)) {
      console.warn(
        "tabletDown is ignored because you've passed down multiple options."
      );
    }

    if (is && this.md.is(is)) {
      return functionOrMapChildren(children, props);
    }

    if (phoneOnly && this.md.phone()) {
      return phoneOnly(props);
    }

    if (tabletOnly && this.md.tablet()) {
      return tabletOnly(props);
    }

    if (tabletDown && this.md.mobile()) {
      return tabletDown(props);
    }

    return desktopOnly
      ? desktopOnly(props)
      : functionOrMapChildren(children, props);
  }
}

export default Responsive;
