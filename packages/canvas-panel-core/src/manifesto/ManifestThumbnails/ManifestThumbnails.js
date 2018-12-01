import React from 'react';
import PropTypes from 'prop-types';

class ManifestThumbnails extends React.Component {
  thumbnailCache = {};

  render() {
    const { manifest, children } = this.props;
    const manifestId = manifest.id || manifest['@id'];
    if (!this.thumbnailCache.hasOwnProperty(manifestId)) {
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
    }
    return children({
      thumbnails: this.thumbnailCache[manifestId],
    });
  }
}

ManifestThumbnails.propTypes = {
  children: PropTypes.func.isRequired,
  manifest: PropTypes.any,
};

export default ManifestThumbnails;
