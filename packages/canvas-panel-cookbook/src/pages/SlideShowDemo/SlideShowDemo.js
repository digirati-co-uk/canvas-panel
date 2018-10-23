import React from 'react';
import { withBemClass } from '@canvas-panel/core';
import { SlideShow } from '@canvas-panel/slideshow';
import QueryStringProvider from '../../QueryStringProvider';

import './SlideShowDemo.scss';

class SlideShowDemoBase extends QueryStringProvider {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Loading...',
      description: ['Loading...'],
      loadedManifestUri: null,
    };
  }
  render() {
    const { bem } = this.props;
    const manifestUri =
      this.urlParams.hasOwnProperty('manifest') &&
      this.urlParams.manifest.constructor === String
        ? this.urlParams.manifest
        : 'https://view.nls.uk/manifest/8397/83973988/manifest.json';

    if (this.state.loadedManifestUri !== manifestUri) {
      fetch(manifestUri)
        .then(response => response.json())
        .then(manifest => {
          let newState = {
            loadedManifestUri: manifestUri,
          };
          if (manifest.label) {
            if (manifest.label.constructor === String) {
              newState.title = manifest.label;
            } else if (manifest.label.constructor === Object) {
              if (manifest.label.hasOwnProperty('en')) {
                newState.title = manifest.label.en[0];
              } else if (
                Object.keys(manifest.label).length > 0 &&
                manifest.label[Object.keys(manifest.label)[0]].length > 0
              ) {
                newState.title =
                  manifest.label[Object.keys(manifest.label)[0]][0];
              }
            }
          }
          if (manifest.metadata) {
            newState.description = manifest.metadata;
          }
          this.setState(newState);
        });
    }
    return (
      <article className={bem}>
        <h1 className={bem.element('title')}>SlideShow Component</h1>
        <section className={bem.element('section')}>
          <h2 className={bem.element('subtitle')}>{this.state.title}</h2>
          {this.state.description.map((item, key) => {
            if (item.constructor === String) {
              return <p key={key}>{item}</p>;
            } else if (
              item.hasOwnProperty('label') &&
              item.hasOwnProperty('value')
            ) {
              let label =
                item.label.constructor === String
                  ? item.label
                  : item.label[Object.keys(item.label)[0]][0];
              let value =
                item.value.constructor === String
                  ? item.value
                  : item.value[Object.keys(item.value)[0]][0];
              return (
                <p
                  key={key}
                  dangerouslySetInnerHTML={{
                    __html: `<em>${label}</em>:&nbsp;${value}`,
                  }}
                />
              );
            }
          })}
          <div className={bem.element('inline-container')}>
            <SlideShow manifestUri={manifestUri} />
          </div>
        </section>
      </article>
    );
  }
}

const SlideShowDemo = withBemClass('slideshow-demo')(SlideShowDemoBase);

export default SlideShowDemo;
