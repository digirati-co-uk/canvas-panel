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
        if (this.props.vertical) {
          this.list.scrollTop =
            -((this.list.offsetHeight - rect.height) / 2) +
            this.selectedThumbnail.offsetTop;
        } else {
          this.list.scrollLeft =
            -((this.list.offsetWidth - rect.width) / 2) +
            this.selectedThumbnail.offsetLeft;
        }
      } else {
        if (this.props.vertical) {
          if (rect.y < 0) {
            this.list.scrollTop = 0;
          } else if (this.list.offsetHeight - rect.height < rect.y) {
            this.list.scrollTop =
              this.selectedThumbnail.offsetTop -
              (this.list.offsetHeight - rect.height);
          }
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
  }

  render() {
    const {
      manifest,
      canvasList,
      canvas,
      tileSize,
      goToRange,
      bem,
      vertical,
      style,
      columns,
    } = this.props;
    const _style = Object.assign(
      {
        position: 'relative',
        width: vertical ? tileSize * columns : 'auto',
        height: vertical ? 'auto' : tileSize,
      },
      style
    );
    return (
      <ManifestThumbnails manifest={manifest}>
        {({ thumbnails }) => (
          <div style={_style} className={bem}>
            <div
              ref={listEl => {
                this.list = listEl;
              }}
              style={
                vertical
                  ? {
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      width: '100%',
                      height: '100%',
                    }
                  : {
                      overflowX: 'auto',
                      overflowY: 'hidden',
                      width: '100%',
                      height: '100%',
                    }
              }
              className={bem.element('scroll')}
            >
              <div
                style={
                  vertical
                    ? {
                        display: 'flex',
                        width: tileSize * columns,
                        flexWrap: 'wrap',
                        //flexDirection: 'column',
                      }
                    : {
                        display: 'flex',
                        //flexDirection: 'row',
                        height: tileSize,
                      }
                }
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
                      src={thumbnailGetSize(
                        thumbnails[canvasId],
                        vertical ? tileSize : null,
                        vertical ? null : tileSize
                      )}
                      className={bem.element('thumb').modifiers({
                        selected: isSelected,
                      })}
                      style={
                        vertical
                          ? {
                              width: tileSize,
                              height: tileSize,
                              objectFit: 'contain',
                              background: 'transparent',
                            }
                          : {
                              height: '100%',
                            }
                      }
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
  tileSize: PropTypes.number,
  goToRange: PropTypes.func.isRequired,
  centerSelected: PropTypes.bool,
  vertical: PropTypes.bool,
  column: PropTypes.number,
  style: PropTypes.object,
};

ThumbnailList.defaultProps = {
  tileSize: 116,
  centerSelected: true,
  vertical: false,
  columns: 1,
  style: {},
};

export default withBemClass('thumbnail-list')(ThumbnailList);
