import React, {Component} from 'react';
import manifesto from 'manifesto.js';
import PropTypes from 'prop-types';
import functionOrMapChildren, {FunctionOrMapChildrenType} from '../../utility/functionOrMapChildren';

class Manifest extends Component {

  state = {
    manifest: null
  };

  static propTypes = {
    /** URL of IIIF Manifest to load */
    url: PropTypes.string.isRequired,
    /** Function children that will be passed a manifest, and return JSX */
    children: FunctionOrMapChildrenType.isRequired,
  };


  componentWillMount() {
    const {url} = this.props;
    manifesto.loadManifest(url).then(jsonLd => {
      this.setState({
        manifest: manifesto.create(jsonLd, { locale: 'en-GB' }),
      });
    });
  }

  render() {
    const {children} = this.props;
    const {manifest} = this.state;
    if (manifest === null) {
      return <div>Loading...</div>;
    }

    return functionOrMapChildren(children, {manifest});
  }
}

export default Manifest;
