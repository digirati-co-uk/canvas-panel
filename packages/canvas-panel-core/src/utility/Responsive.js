import React, { PureComponent } from 'react';
import MobileDetect from 'mobile-detect';
import functionOrMapChildren from './functionOrMapChildren';

class Responsive extends PureComponent {
  static isMobile() {
    return !!Responsive.md.phone();
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

    if (is && Responsive.md.is(is)) {
      return functionOrMapChildren(children, props);
    }

    if (phoneOnly && Responsive.md.phone()) {
      return phoneOnly(props);
    }

    if (tabletOnly && Responsive.md.tablet()) {
      return tabletOnly(props);
    }

    if (tabletDown && Responsive.md.mobile()) {
      return tabletDown(props);
    }

    return desktopOnly
      ? desktopOnly(props)
      : children
        ? functionOrMapChildren(children, props)
        : null;
  }
}

Responsive.md = new MobileDetect(window.navigator.userAgent);

export default Responsive;
