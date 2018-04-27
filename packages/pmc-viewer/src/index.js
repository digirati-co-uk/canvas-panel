import React from 'react';
import { render } from 'react-dom';
import { htmlElementObserver, ObservableElement } from '@canvas-panel/core';
import App from './App';
import PmcViewerPopOutComponent from './components/PmcViewerComponent/PmcViewerComponent';

function createPmcViewerComponent($viewer) {
  const initialProps = { ...$viewer.dataset };
  const innerText = $viewer.innerText;

  render(
    <ObservableElement
      observer={htmlElementObserver($viewer)}
      initialProps={initialProps}
      render={props =>
        props.manifest ? (
          <PmcViewerPopOutComponent
            {...props}
            text={innerText}
            getRef={osd => ($viewer.osd = osd)}
          />
        ) : null
      }
    />,
    $viewer
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const popup = Array.from(
    document.querySelectorAll('[data-element="pmc-viewer-pop-out"]')
  );

  popup.forEach($popOut => {
    try {
      createPmcViewerComponent($popOut);
    } catch (e) {
      console.warn('Unable to render viewer', e);
    }
  });

  const viewers = Array.from(
    document.querySelectorAll('[data-element="pmc-viewer"]')
  );

  viewers.forEach($viewer => {
    render(<App manifest={$viewer.getAttribute('data-manifest')} />, $viewer);
  });
});
