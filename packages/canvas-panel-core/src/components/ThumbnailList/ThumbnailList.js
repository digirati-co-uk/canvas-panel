import React from 'react';
import PropTypes from 'prop-types';
import { withBemClass } from '@canvas-panel/core';
//import './ThumbnailList.scss';

const thumbnailGetSize = (thumbnail, pWidth, pHeight) => {
  const thumb = thumbnail.__jsonld;
  if (
    (pWidth || pHeight) &&
    thumb.hasOwnProperty('service') &&
    thumb.service.hasOwnProperty('sizes')
  ) {
    let closestSizeIndex = -1;
    let minDistanceX = Number.MAX_SAFE_INTEGER;
    let minDistanceY = Number.MAX_SAFE_INTEGER;
    thumb.service.sizes.forEach((size, index) => {
      if (pWidth) {
        const xDistance = Math.abs(size.width - pWidth);
        if (minDistanceX >= xDistance) {
          closestSizeIndex = index;
          minDistanceX = xDistance;
        }
      }
      if (pHeight) {
        const yDistance = Math.abs(size.height - pHeight);
        if (minDistanceY >= yDistance) {
          closestSizeIndex = index;
          minDistanceY = yDistance;
        }
      }
    });
    let thumbUrlParts = (thumb.id || thumb['@id']).split('/');
    if (closestSizeIndex !== -1) {
      const size = thumb.service.sizes[closestSizeIndex];
      thumbUrlParts[thumbUrlParts.length - 3] = [size.width, size.height].join(
        ','
      );
    }
    return thumbUrlParts.join('/');
  } else {
    return thumb.id || thumb['@id'];
  }
};

class ThumbnailList extends React.Component {
  thumbnailCache = {};

  componentDidUpdate(/*prevProps, prevState*/) {
    if (this.selectedThumbnail) {
      const list = this.selectedThumbnail.parentNode.parentNode;
      const rect = this.selectedThumbnail.getBoundingClientRect();
      if (rect.x < 0) {
        list.scrollLeft = 0;
      } else if (list.offsetWidth - rect.width < rect.x) {
        list.scrollLeft =
          this.selectedThumbnail.offsetLeft - (list.offsetWidth - rect.width);
      }
    }
  }

  getThumbnails = manifest => {
    const manifestId = manifest.id || manifest['@id'];
    if (this.thumbnailCache.hasOwnProperty(manifestId)) {
      return this.thumbnailCache[manifestId];
    }

    const thumbnails = manifest.getSequences().reduce(
      (sequenceThumbnails, sequence) =>
        Object.assign(
          sequenceThumbnails,
          sequence.getCanvases().reduce((canvasThumbnails, canvas) => {
            const canvasId = canvas.id || canvas['@id'];
            canvasThumbnails[canvasId] = canvas.getThumbnail();
            return canvasThumbnails;
          }, {})
        ),
      {}
    );
    this.thumbnailCache[manifestId] = thumbnails;
    return thumbnails;
  };

  render() {
    const {
      children,
      manifest,
      canvasList,
      currentCanvas,
      height,
      showControls,
      goToRange,
      bem,
    } = this.props;
    const allThumbnails = this.getThumbnails(manifest);

    return (
      <div style={{ height: height }} className={bem}>
        <div className={bem.element('scroll')}>
          <div style={{ height: height }} className={bem.element('thumb-list')}>
            {canvasList.map((canvasId, index) => {
              const isSelected =
                canvasId === (currentCanvas.id || currentCanvas['@id']);
              return (
                <img
                  ref={imageEl => {
                    if (isSelected) {
                      this.selectedThumbnail = imageEl;
                    }
                  }}
                  key={`${canvasId}--thumb`}
                  src={thumbnailGetSize(allThumbnails[canvasId], null, height)}
                  className={bem.element('thumb').modifiers({
                    selected: isSelected,
                  })}
                  alt=""
                  onClick={() => goToRange(index)}
                />
              );
            })}
          </div>
          {showControls ? children : ''}
        </div>
      </div>
    );
  }
}

ThumbnailList.propTypes = {
  manifest: PropTypes.object.isRequired,
  canvasList: PropTypes.array.isRequired,
  currentCanvas: PropTypes.object,
  height: PropTypes.number,
};

ThumbnailList.defaultProps = {
  height: 116,
};

// NOTE: this is gatsby.js specific.
export default withBemClass('thumbnail-list')(ThumbnailList);
