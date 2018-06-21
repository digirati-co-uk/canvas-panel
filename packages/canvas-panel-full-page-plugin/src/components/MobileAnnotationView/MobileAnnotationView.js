import React, { Component } from 'react';
import { AnnotationDetail, withBemClass } from '@canvas-panel/core';
import AnnotationNavigation from '../AnnotationNavigation/AnnotationNavigation';
import './MobileAnnotationView.scss';

class MobileAnnotationView extends Component {
  state = {
    current: 0,
  };

  static defaultProps = {
    animationFramePadding: 400,
  };

  componentWillReceiveProps(newProps, newContext) {
    if (newProps.disabled === false && this.props.disabled === true) {
      this.goToAnnotation(this.state.current);
    }
  }

  goToAnnotation(index) {
    const { annotations } = this.props;

    if (index === 0) {
      this.props.viewport.resetView();
    } else {
      const { x, y, width, height } = annotations[index - 1].on.selector;
      this.props.viewport.goToRect(
        {
          x,
          y,
          width,
          height: height * 2,
        },
        this.props.animationFramePadding
      );
    }

    // navigate to annotation.
    this.setState({
      current: index,
    });
  }

  onNext = () => {
    const { annotations } = this.props;
    const { current } = this.state;
    if (current >= annotations.length) {
      return null;
    }

    this.goToAnnotation(current + 1);
  };

  onPrevious = () => {
    const { current } = this.state;
    if (current === 0) {
      return;
    }
    this.goToAnnotation(current - 1);
  };

  renderSplash() {
    const { bem, children } = this.props;
    return (
      <div className={bem.element('inner')}>
        {children}
        <button
          className={bem.element('button')}
          onClick={() => this.goToAnnotation(1)}
        >
          Start
        </button>
      </div>
    );
  }

  renderAnnotation(annotation, next) {
    const { current } = this.state;
    const { bem, annotations, disabled } = this.props;

    return (
      <div className={bem.element('annotation-panel').modifiers({ disabled })}>
        <AnnotationDetail annotation={annotation} />
        <div className={bem.element('footer')}>
          <AnnotationNavigation
            bem={bem}
            onNext={current >= annotations.length ? null : this.onNext}
            onPrevious={current <= 0 ? null : this.onPrevious}
          />
        </div>
        <div className={bem.element('void')}>
          {next ? <AnnotationDetail annotation={next} /> : null}
        </div>
      </div>
    );
  }

  render() {
    const { annotations, disabled, bem } = this.props;
    const { current } = this.state;
    const annotation =
      current === 0 ? null : annotations[current - 1].annotation;
    const next = annotations[current] ? annotations[current].annotation : null;

    return (
      <div className={bem.modifiers({ splash: current === 0, disabled })}>
        {annotation
          ? this.renderAnnotation(annotation, next)
          : this.renderSplash()}
      </div>
    );
  }
}

export default withBemClass('mobile-annotation-view')(MobileAnnotationView);
