import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import StaticImageViewport from '../../../../canvas-panel-core/src/viewers/StaticImageViewport/StaticImageViewport';
import CanvasDetail from '../CanvasDetail/CanvasDetail';
import './MobilePageView.scss';

class MobilePageView extends Component {
  render() {
    const { bem, manifest } = this.props;
    return (
      <div className={bem}>
        {manifest
          .getSequenceByIndex(0)
          .getCanvases()
          .map(canvas => (
            <CanvasDetail key={canvas.id} canvas={canvas}>
              {({ label, body, attributionLabel, attribution }) => (
                <div className={bem.element('canvas')}>
                  <StaticImageViewport
                    className={bem.element('canvas-image')}
                    manifest={manifest}
                    canvas={canvas}
                    maxHeight={200}
                    maxWidth={200}
                  >
                    <div className={bem.element('attribution')}>
                      {attributionLabel} {attribution}
                    </div>
                  </StaticImageViewport>
                  <div className={bem.element('metadata')}>
                    <div className={bem.element('detail')}>
                      <h3 className={bem.element('detail-label')}>{label}</h3>
                      <p className={bem.element('detail-body')}>{body}</p>
                    </div>
                  </div>
                </div>
              )}
            </CanvasDetail>
          ))}
      </div>
    );
  }
}

export default withBemClass('mobile-page-view')(MobilePageView);
