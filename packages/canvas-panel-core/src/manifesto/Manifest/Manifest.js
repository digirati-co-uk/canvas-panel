import React, { Component } from 'react';
import * as Manifesto from 'manifesto.js';
import * as PropTypes from 'prop-types';
import functionOrMapChildren, {
  FunctionOrMapChildrenType,
} from '../../utility/functionOrMapChildren';

class Manifest extends Component {
  state = {
    error: null,
    manifest: null,
  };

  static propTypes = {
    /** URL of IIIF Manifest to load */
    url: PropTypes.string,
    /** Function children that will be passed a manifest, and return JSX */
    children: FunctionOrMapChildrenType.isRequired,
    /** Locale to fetch the manifest */
    locale: PropTypes.string,
  };

  static defaultProps = {
    locale: 'en-GB',
  };

  componentWillMount() {
    const { url, jsonLd } = this.props;

    if (jsonLd) {
      this.setState({ manifest: this.create(jsonLd) });
      return;
    }

    fetch(url, { cache: 'force-cache' })
      .then(j => j.json())
      .then(fetchedJsonLd => {
        this.setState({
          manifest: this.create(fetchedJsonLd),
        });
      })
      .catch(error => {
        this.setState({
          error: 'something went wrong fetching this manifest.',
        });
      });
  }

  create(jsonLd) {
    return Manifesto.create(jsonLd, { locale: this.props.locale });
  }

  render() {
    const { children } = this.props;
    const { manifest, error } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    if (manifest === null) {
      return <div>Loading...</div>;
    }

    return functionOrMapChildren(children, { manifest });
  }
}

export default Manifest;
