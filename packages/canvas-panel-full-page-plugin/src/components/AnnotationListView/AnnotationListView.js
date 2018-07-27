import React, { Component } from 'react';
import BezierEasing from 'bezier-easing';
import PagePanel from '../PagePanel/PagePanel';
import { AnnotationDetail } from '@canvas-panel/core';

class AnnotationListView extends Component {
  static defaultProps = {
    offset: 0,
    animationFramePadding: 600,
    animationSpeed: 1, // seconds
    bezierEasing: [0.6, 0.02, 0.0, 0.75],
    annotationPosition: 'top',
  };

  componentWillMount() {
    this.props.setUpdater(this.update);
    this.updateView(this.props);
    this.updateEasing(this.props.bezierEasing);
    this.setTweenFromAnnotations(this.props);
  }

  setTweenFromAnnotations = ({ annotations, width, height }) => {
    this.tween = annotations.reduce(
      ({ prev, list = [] }, next) => {
        return {
          prev: next.on.selector,
          list: [...list, { from: prev, to: next.on.selector }],
        };
      },
      {
        prev: {
          x: 0,
          y: 0,
          width,
          height,
        },
      }
    );
  };

  updateEasing([a, b, c, d]) {
    this.ease = BezierEasing(a, b, c, d);
  }

  update = n => {
    const t = this.tween.list[~~n];

    if (t) {
      const ease = this.ease(n - ~~n);
      this.props.viewport.goToRect(
        {
          x: t.from.x + (t.to.x - t.from.x) * ease,
          y: t.from.y + (t.to.y - t.from.y) * ease,
          width: t.from.width + (t.to.width - t.from.width) * ease,
          height: t.from.height + (t.to.height - t.from.height) * ease,
        },
        this.props.animationFramePadding,
        1
      );
    }
  };

  componentWillReceiveProps(newProps, newContext) {
    if (newProps.viewport && newProps.current !== this.props.current) {
      this.updateView(newProps);
    }
    if (newProps.bezierEasing !== this.props.bezierEasing) {
      this.updateEasing(newProps.bezierEasing);
    }
  }

  updateView(newProps) {
    // if (newProps.current < newProps.offset) {
    //   newProps.viewport.resetView(this.props.animationSpeed);
    // }
  }

  onNext = (annotation, key) =>
    this.props.onNext ? () => this.props.onNext(annotation, key) : null;

  onPrevious = (annotation, key) =>
    this.props.onPrevious ? () => this.props.onPrevious(annotation, key) : null;

  render() {
    const { annotations, disabled } = this.props;

    return (annotations || []).map(({ annotation, on }, key) => (
      <PagePanel
        position={this.props.annotationPosition}
        disabled={disabled}
        key={key}
        onNext={
          annotations.length - 1 > key
            ? this.onNext(annotations[key + 1], key + 1)
            : null
        }
        onPrevious={
          key > 0 ? this.onPrevious(annotations[key - 1], key - 1) : null
        }
      >
        <AnnotationDetail annotation={annotation} />
      </PagePanel>
    ));
  }
}

export default AnnotationListView;
