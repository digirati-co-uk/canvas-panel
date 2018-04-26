import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { createStore } from '@canvas-panel/redux';
import {
  reducer as searchReducer,
  saga as searchSaga,
} from '@canvas-panel/search';
import { Provider } from 'react-redux';
import { manifestRequest } from '@canvas-panel/redux/es/spaces/manifest';
import Layout from './components/Layout/Layout';
import Viewer from './components/Viewer/Viewer';

const store = createStore(
  {
    search: searchReducer,
  },
  [],
  [searchSaga]
);

class App extends Component {
  viewport = null;
  state = { viewportAvailable: false };

  setViewport = viewport => {
    this.viewport = viewport;
    this.setState({ viewportAvailable: true });
  };

  componentWillMount() {
    store.dispatch(
      manifestRequest(this.props.manifestUri, 'en-GB', { startCanvas: 2 })
    );
  }

  render() {
    const { viewportAvailable } = this.state;
    return (
      <Provider store={store}>
        <Layout style={{ background: '#2D3135' }}>
          <Layout.Header>
            <Header viewport={viewportAvailable ? this.viewport : null} />
          </Layout.Header>
          <Layout.Main>
            <Viewer setViewport={this.setViewport} />
          </Layout.Main>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Provider>
    );
  }
}

export default App;
