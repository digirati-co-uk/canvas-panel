import React from 'react';
import { render } from 'react-dom';
import ViewerComponent from './ViewerComponent';
import ObservableElement from './ObservableElement';

function setupObserver($element, onChange) {
  try {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(({ type }) => {
        if (type === 'attributes') {
          onChange({ ...$element.dataset });
        }
      });
    });

    observer.observe($element, { attributes: true });
  } catch (e) {
    console.warn('Could not set up observer', e);
  }
}

function createViewerComponent($viewer) {
  const initialProps = { ...$viewer.dataset };

  render(
    <ObservableElement
      initialProps={initialProps}
      render={props =>
        props.manifest ? (
          <ViewerComponent {...props} getRef={osd => ($viewer.osd = osd)} />
        ) : null
      }
      observe={callback => setupObserver($viewer, callback)}
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
