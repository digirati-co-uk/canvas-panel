import React, { Component } from 'react';
import ImageContainer from './components/ImageContainer/ImageContainer';
import TimelineTitle from './components/TimelineTitle/TimelineTitle';
import StartScreen from './components/StartScreen/StartScreen';
import Header from './components/Header/Header';
import './components/main.scss';
import Viewer from './components/Viewer/Viewer';
import Layout from './components/Layout/Layout';
import Timeline from './components/Timeline/Timeline';
import { Provider } from 'react-redux';
import createCustomStore from './redux/createStore';
import { manifestRequest } from './redux/spaces/manifest';
import Drawer from './components/Drawer/Drawer';
import Slider from './components/Slider/Slider';
import RangeSlider from './components/RangeSlider/RangeSlider';
import Controls from './components/Controls/Controls';

const store = createCustomStore();

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
    store.dispatch(manifestRequest(this.props.manifestUri, 'en-GB'));
  }

  render() {
    return (
      <Provider store={store}>
        <Layout
          header={() => (
            <div>
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
          footer={() => [<RangeSlider />, <Controls />]}
        />
      </Provider>
    );
  }
}

export default App;