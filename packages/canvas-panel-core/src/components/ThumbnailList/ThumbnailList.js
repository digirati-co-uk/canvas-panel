import React from 'react';
import PropTypes from 'prop-types';
import { withBemClass } from '../Bem/Bem';
import ManifestThumbnails from '../../manifesto/ManifestThumbnails/ManifestThumbnails';

// NOTE: This is just temporary until get thumbnail by size function getting merged to manifesto.
// https://github.com/digirati-co-uk/manifesto/pull/1
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

  stylesForProps = () => {
    const { vertical, tileSize, columns, style } = this.props;
    const main = Object.assign(
      {
        position: 'relative',
        width: vertical ? tileSize * columns : 'auto',
        height: vertical ? 'auto' : tileSize,
      },
      style
    );
    if (vertical) {
      return {
        main,
        scroll: {
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          height: '100%',
        },
        thumbList: {
          display: 'flex',
          width: tileSize * columns,
          flexWrap: 'wrap',
        },
        thumbnail: {
          width: tileSize,
          height: tileSize,
          objectFit: 'contain',
          background: 'transparent',
        },
      };
    } else {
      return {
        main,
        scroll: {
          overflowX: 'auto',
          overflowY: 'hidden',
          width: '100%',
          height: '100%',
        },
        thumbList: {
          display: 'flex',
          height: tileSize,
        },
        thumbnail: {
          height: '100%',
        },
      };
    }
  };

  render() {
    const {
      manifest,
      canvasList,
      canvas,
      tileSize,
      goToRange,
      bem,
      vertical,
    } = this.props;
    const styles = this.stylesForProps();
    return (
      <ManifestThumbnails manifest={manifest}>
        {({ thumbnails }) => (
          <div style={styles.main} className={bem}>
            <div
              ref={listEl => {
                this.list = listEl;
              }}
              style={styles.scroll}
              className={bem.element('scroll')}
            >
              <div
                style={styles.thumbList}
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
                      style={styles.thumbnail}
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
  /** Theming higher-order component */
  bem: PropTypes.any,
  /** IIIF Manifest */
  manifest: PropTypes.object.isRequired,
  /** List of canvas ids */
  canvasList: PropTypes.array.isRequired,
  /** Currently active canvas */
  canvas: PropTypes.object,
  /** In horizontal mode this is the height of the tile, in vertical mode this represents the tile box with/height */
  tileSize: PropTypes.number,
  /** Passend from the CanvasNavigation/RangeNavigation */
  goToRange: PropTypes.func.isRequired,
  /**
   * if turned off the active thumbnail aligned to the right/bottom of the viewport.
   * `TODO:` Maybe useful for vertical listings, but for horizontal the centred mode
   * feels more natural. Perhaps remove this feature, and use the center active thumbnail as default.
   * It simplifies the code, which is getting a little bit hectic at its current state.
   */
  centerSelected: PropTypes.bool,
  /** vertical scroll for side panel mode */
  vertical: PropTypes.bool,
  /** columns only work in vertical mode */
  columns: PropTypes.number,
  /** styles can be passed to the main element */
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
