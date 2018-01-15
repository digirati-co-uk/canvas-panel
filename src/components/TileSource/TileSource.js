import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Manifesto from 'manifesto.js';
import getDataUriFromCanvas from '../../utility/getDataUriFromCanvas';
import functionOrMapChildren, {FunctionOrMapChildrenType} from '../../utility/functionOrMapChildren';

class TileSource extends Component {

  state = {
    imageUri: null,
    tileSource: null,
  };

  static propTypes = {
    canvas: PropTypes.oneOfType(Manifesto.Canvas).isRequired,
    manifest: PropTypes.oneOfType(Manifesto.Manifest).isRequired,
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

    if (!TileSource.cache[imageUri]) {
      TileSource.cache[imageUri] = fetch(imageUri)
        .then(resp => resp.json());
    }

    return TileSource.cache[imageUri].then(tileSource => {
      this.setState({
        imageUri,
        tileSource,
      })
    });
  }

  componentWillReceiveProps(newProps) {
    const imageUri = getDataUriFromCanvas(newProps.canvas);
    if (imageUri !== this.props.imageUri) {
      this.updateImageUri(imageUri);
    }
  }

  renderFallback() {
    const {canvas, fallbackWidth} = this.props;
    return (
      <div>
        <img src={canvas.getCanonicalImageUri(fallbackWidth)} />
      </div>
    );
  }

  render() {
    const {children, fallbackWidth, canvas, preLoad, ...props} = this.props;
    const {imageUri, tileSource} = this.state;

    if (tileSource === null) {
      return 'loading tile source';
    }

    // Render children if they exist.
    if (children) {
      const childrenRender = functionOrMapChildren(children, { canvas, imageUri, tileSource, ...props });
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

export default TileSource;
