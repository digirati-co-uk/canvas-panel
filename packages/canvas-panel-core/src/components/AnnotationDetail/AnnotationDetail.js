/**
 * @flow
 */
import React, { Component } from 'react';
import * as Manifesto from 'manifesto.js';
import { withBemClass, type BemBlockType } from '../Bem/Bem';

type Props = {
  annotation: Manifesto.Annotation,
  onClose: (e: MouseEvent) => void,
  closeText: string,
  bem: BemBlockType,
};

class AnnotationDetail extends Component<Props> {
  static defaultProps = {
    closeText: 'close',
  };

  render() {
    const { annotation, onClose, closeText, bem } = this.props;
    const resource = annotation.getResource();
    const bodies = annotation.getBody();

    if (bodies.length) {
      return (
        <div className={bem}>
          {bodies.map((body, key) => {
            return (
              <div key={key}>
                {body.__jsonld.label ? (
                  <h1 className={bem.element('label')}>
                    {body.__jsonld.label}
                  </h1>
                ) : null}
                <div
                  className={bem.element('value')}
                  key={key}
                  dangerouslySetInnerHTML={{ __html: body.__jsonld.value }}
                />
                {onClose ? (
                  <button className={bem.element('close')} onClick={onClose}>
                    {closeText}
                  </button>
                ) : null}
              </div>
            );
          })}
        </div>
      );
    }

    if (resource && resource.getProperty('within')) {
      const toDisplay = resource.getProperty('within');
      return (
        <div className={bem}>
          <h1 className={bem.element('label')}>{toDisplay.label}</h1>
          <p className={bem.element('description')}>{toDisplay.description}</p>
          {onClose ? (
            <button className={bem.element('close')} onClick={onClose}>
              {closeText}
            </button>
          ) : null}
        </div>
      );
    }

    return (
      <div className={bem}>
        <h1 className={bem.element('label')}>{annotation.getLabel()}</h1>
        <p className={bem.element('description')}>
          {annotation.getProperty('description')}
        </p>
        {onClose ? (
          <button className={bem.element('close')} onClick={onClose}>
            {closeText}
          </button>
        ) : null}
      </div>
    );
  }
}

export default withBemClass('annotation-detail')(AnnotationDetail);
