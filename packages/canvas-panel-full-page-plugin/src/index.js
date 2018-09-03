import React from 'react';
import ReactDOM from 'react-dom';
import FullPageViewer from './components/Viewer/Viewer';
import PopOutViewer from './components/PopOutViewer/PopOutViewer';

const defaultConfiguration = {};

function create(el, userConfiguration) {
  if (!el || !el instanceof HTMLElement) {
    console.error(`singleCanvasAnnotationDetailViewer:
      You must provide an 'el' property in the configuration pointing
      to the DOM element you want the viewer to be mounted at.
    `);
    return;
  }

  if (!userConfiguration.manifest) {
    console.error(`singleCanvasAnnotationDetailViewer:
      You must provide a URL pointing to a IIIF manifest.
    `);
    return;
  }

  const config = Object.assign({}, defaultConfiguration, userConfiguration);

  if (config.type === 'pop-out') {
    if (!config.innerHtml) {
      config.innerHtml = el.innerHTML;
    }

    ReactDOM.render(<PopOutViewer {...config} />, el);

    return;
  }

  if (!config.children) {
    config.children = (
      <div dangerouslySetInnerHTML={{ __html: el.innerHTML }} />
    );
  }

  ReactDOM.render(<FullPageViewer {...config} />, el);
}

export { create, FullPageViewer, PopOutViewer };
export default { create, FullPageViewer, PopOutViewer };
