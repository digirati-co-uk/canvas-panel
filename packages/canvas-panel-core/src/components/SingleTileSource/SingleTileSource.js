import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import * as Manifesto from '@stephenwf-forks/manifesto.js';
import getDataUriFromCanvas from '../../utility/getDataUriFromCanvas';
import functionOrMapChildren, {
  FunctionOrMapChildrenType,
} from '../../utility/functionOrMapChildren';

class SingleTileSource extends Component {
  state = {
    imageUri: null,
    tileSources: [],
  };

  static propTypes = {
    canvas: PropTypes.instanceOf(Manifesto.Canvas),
    manifest: PropTypes.instanceOf(Manifesto.Manifest),
    preLoad: PropTypes.func,
    children: FunctionOrMapChildrenType,
    fallbackWidth: PropTypes.number,
  };

  static defaultProps = {
    fallbackWidth: 200,
  };

  componentWillMount() {
    const imageUri = getDataUriFromCanvas(this.props.canvas);
    this.updateImageUri(imageUri);
  }

  static cache = {};

  updateImageUri(imageUri) {
    if (!imageUri) {
      return null;
    }

    if (!imageUri.endsWith('/info.json')) {
      this.setState({
        imageUri,
        tileSources: [
          {
            type: 'image',
            url: imageUri,
          },
        ],
      });
      return;
    }

    if (!SingleTileSource.cache[imageUri]) {
      SingleTileSource.cache[imageUri] = fetch(imageUri).then(resp =>
        resp.json()
      );
    }

    return SingleTileSource.cache[imageUri].then(tileSource => {
      this.setState({
        imageUri,
        tileSources: [tileSource],
      });
    });
  }

  componentWillReceiveProps(newProps) {
    const imageUri = getDataUriFromCanvas(newProps.canvas);
    if (imageUri !== this.state.imageUri) {
      this.updateImageUri(imageUri);
    }
  }

  renderFallback() {
    const { canvas, fallbackWidth } = this.props;
    const { tileSources } = this.state;

    const tileSource = tileSources[0];

    const fallbackImageUrl =
      tileSource && tileSource.type === 'image'
        ? tileSource.url
        : canvas.getCanonicalImageUri(fallbackWidth);

    return (
      <div>
        <img width={fallbackWidth} src={fallbackImageUrl} />
      </div>
    );
  }

  render() {
    const { children, fallbackWidth, canvas, preLoad, ...props } = this.props;
    const { imageUri, tileSources } = this.state;

    if (tileSources === null) {
      return 'loading tile source';
    }

    // Render children if they exist.
    if (children) {
      const childrenRender = functionOrMapChildren(children, {
        canvas,
        imageUri,
        tileSources,
        ...props,
      });
      if (childrenRender) {
        return childrenRender;
      }
    }

    if (preLoad) {
      return preLoad(this.props);
    }

    return this.renderFallback();
  }
}

export default SingleTileSource;
