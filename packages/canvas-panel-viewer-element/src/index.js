import React from 'react';
import { render } from 'react-dom';
import { ObservableElement, htmlElementObserver } from '@canvas-panel/core';
import ViewerComponent from './ViewerComponent';

function createViewerComponent($viewer) {
  const initialProps = { ...$viewer.dataset };

  render(
    <ObservableElement
      observer={htmlElementObserver($viewer)}
      initialProps={initialProps}
      render={props =>
        props.manifest ? (
          <ViewerComponent {...props} getRef={osd => ($viewer.osd = osd)} />
        ) : null
      }
    />,
    $viewer
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const viewers = Array.from(
    document.querySelectorAll('[data-element="canvas-panel-viewer"]')
  );

  viewers.forEach($viewer => {
    try {
      createViewerComponent($viewer);
    } catch (e) {
      console.warn('Unable to render viewer', e);
    }
  });
});
