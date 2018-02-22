import React, { Component } from 'react';
import { createStore } from '@canvas-panel/redux';
import {
  reducer as timelineReducer,
  saga as timelineSaga,
  Timeline,
} from '@canvas-panel/timeline';

import StartScreen from './components/StartScreen/StartScreen';
import Header from './components/Header/Header';
import './components/main.scss';
import Viewer from './components/Viewer/Viewer';
import Layout from './components/Layout/Layout';
import { Provider } from 'react-redux';
import { manifestRequest } from '@canvas-panel/redux/es/spaces/manifest';
import Drawer from './components/Drawer/Drawer';
import RangeSlider from './components/RangeSlider/RangeSlider';
import NavigationControls from './components/NavigationControls/NavigationControls';
import Supplemental from './components/Supplemental/Supplemental';
import SearchBox from './components/SearchBox/SearchBox';

const store = createStore({ structure: timelineReducer }, [], [timelineSaga]);

type Props = {
  manifestUri: string,
};

class App extends Component<Props> {
  startScreen = null;
  drawer = null;
  state = { manifest: null, c: 0 };

  openStartScreen = () => {
    if (this.startScreen) {
      this.startScreen.openStartScreen();
    }
  };

  openMenu = () => {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  };

  componentWillMount() {
    store.dispatch(
      manifestRequest(this.props.manifestUri, 'en-GB', { startCanvas: 2 })
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Layout
          header={() => (
            <div>
              <Supplemental />
              <StartScreen
                ref={startScreen =>
                  (this.startScreen = startScreen.getWrappedInstance())
                }
              />
              <Header
                onClickInfo={this.openStartScreen}
                onClickMenu={this.openMenu}
              />
              <Timeline />
              <Drawer
                ref={drawer =>
                  (this.drawer = drawer
                    ? drawer.getWrappedInstance().getWrappedInstance()
                    : null)
                }
              />
            </div>
          )}
          content={() => <Viewer />}
          footer={() => [
            <SearchBox />,
            <RangeSlider />,
            <NavigationControls />,
          ]}
        />
      </Provider>
    );
  }
}

export default App;
