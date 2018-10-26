import React, { Component } from 'react';
import { LocaleString, withBemClass } from '@canvas-panel/core';
import './CanvasDetail.scss';

class CanvasDetail extends Component {
  getLabel() {
    const label = this.props.canvas.getLabel();
    return !label || label.length === 0 ? null : (
      <LocaleString>{this.props.canvas.getLabel()}</LocaleString>
    );
  }

  getBody() {
    const { summary, description } = this.props.canvas.__jsonld;

    if (summary) {
      return <LocaleString>{summary}</LocaleString>;
    }

    if (description) {
      return <LocaleString>{description}</LocaleString>;
    }

    return null;
  }

  getAttribution() {
    const { attribution, requiredStatement } = this.props.canvas.__jsonld;

    if (attribution) {
      return <LocaleString>{attribution}</LocaleString>;
    }
    if (requiredStatement) {
      return <LocaleString>{requiredStatement.value}</LocaleString>;
    }
  }

  getAttributionLabel() {
    const { requiredStatement } = this.props.canvas.__jsonld;
    if (requiredStatement) {
      return <LocaleString>{requiredStatement.label}</LocaleString>;
    }

    return 'Attribution';
  }

  render() {
    const { canvas, children } = this.props;

    return children({
      canvas,
      label: this.getLabel(),
      body: this.getBody(),
      attributionLabel: this.getAttributionLabel(),
      attribution: this.getAttribution(),
    });
  }
}

export default CanvasDetail;
