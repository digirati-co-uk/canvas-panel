import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './PagePanel.scss';
import AnnotationNavigation from '../AnnotationNavigation/AnnotationNavigation';

class PagePanel extends Component {
  render() {
    const { style, bem, onPrevious, onNext, position } = this.props;
    return (
      <div
        className={bem.modifiers({
          disabled: this.props.disabled,
          top: position === 'top',
          bottom: position === 'bottom',
        })}
        style={style}
      >
        <div className={bem.element('inner')}>
          {this.props.children}
          <div className={bem.element('footer')}>
            <AnnotationNavigation
              bem={bem}
              onNext={onNext}
              onPrevious={onPrevious}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withBemClass('page-panel')(PagePanel);
