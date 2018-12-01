import React from 'react';
import PropTypes from 'prop-types';
import { withBemClass } from '../Bem/Bem';
import ManifestThumbnails from '../../manifesto/ManifestThumbnails/ManifestThumbnails';

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
  componentDidUpdate(/*prevProps, prevState*/) {
    if (this.selectedThumbnail) {
      const rect = this.selectedThumbnail.getBoundingClientRect();
      if (this.props.centerSelected) {
        this.list.scrollLeft =
          -((this.list.offsetWidth - rect.width) / 2) +
          this.selectedThumbnail.offsetLeft;
      } else {
        if (rect.x < 0) {
          this.list.scrollLeft = 0;
        } else if (this.list.offsetWidth - rect.width < rect.x) {
          this.list.scrollLeft =
            this.selectedThumbnail.offsetLeft -
            (this.list.offsetWidth - rect.width);
        }
      }
    }
  }

  render() {
    const { manifest, canvasList, canvas, height, goToRange, bem } = this.props;
    return (
      <ManifestThumbnails manifest={manifest}>
        {({ thumbnails }) => (
          <div style={{ height: height }} className={bem}>
            <div
              ref={listEl => {
                this.list = listEl;
              }}
              className={bem.element('scroll')}
            >
              <div
                style={{ height: height }}
                className={bem.element('thumb-list')}
              >
                {canvasList.map((canvasId, index) => {
                  const isSelected = canvasId === (canvas.id || canvas['@id']);
                  return (
                    <img
                      ref={imageEl => {
                        if (isSelected) {
                          this.selectedThumbnail = imageEl;
                        }
                      }}
                      key={`${canvasId}--thumb`}
                      src={thumbnailGetSize(thumbnails[canvasId], null, height)}
                      className={bem.element('thumb').modifiers({
                        selected: isSelected,
                      })}
                      alt=""
                      onClick={() => goToRange(index)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </ManifestThumbnails>
    );
  }
}

ThumbnailList.propTypes = {
  bem: PropTypes.any,
  manifest: PropTypes.object.isRequired,
  canvasList: PropTypes.array.isRequired,
  canvas: PropTypes.object,
  height: PropTypes.number,
  goToRange: PropTypes.func.isRequired,
  centerSelected: PropTypes.bool,
};

ThumbnailList.defaultProps = {
  height: 116,
  centerSelected: true,
};

export default withBemClass('thumbnail-list')(ThumbnailList);
