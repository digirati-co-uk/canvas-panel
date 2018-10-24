import CanvasDetail from './components/CanvasDetail/CanvasDetail';
import CanvasNavigation from './components/CanvasNavigation/CanvasNavigation';
import FullscreenButton from './components/FullscreenButton/FullscreenButton';
import MobilePageView from './components/MobilePageView/MobilePageView';
import MobileViewer from './components/MobileViewer/MobileViewer';
import PeekComponent from './components/PeekComponent/PeekComponent';
import ProgressIndicator from './components/ProgressIndicator/ProgressIndicator';
import SimpleSlideTransition from './components/SimpleSlideTransition/SimpleSlideTransition';
import Slide from './components/Slide/Slide';
import SlideShow from './components/Slideshow/SlideShow';
import SwappableViewer from './components/SwappableViewer/SwappableViewer';
import TapDetector from './components/TapDetector/TapDetector';
import ZoomButtons from './components/ZoomButtons/ZoomButtons';

const DEFAULT_SLIDESHOW_CONFIG = {
  mobileBreakpoint: 767,
};

function create(el, userConfiguration) {
  // In order to provide a meaningful error message in case if the user configuration hasn't been passed at all.
  userConfiguration = userConfiguration || {};
  if (!el) {
    console.error(`slideShowViewer:
      You must provide an 'el' property in the configuration pointing
      to the DOM element you want the viewer to be mounted at.
    `);
    return;
  }
  /* TODO?: && !userConfiguration.jsonLdManifest */
  if (!userConfiguration.manifestUri) {
    console.error(`slideShowViewer:
      You must provide a URL pointing to a IIIF manifest.
    `);
    return;
  }

  const config = Object.assign({}, DEFAULT_SLIDESHOW_CONFIG, userConfiguration);

  ReactDOM.render(<SlideShow {...config} />, el);
}

const help = function() {
  console.info(`
  slideShowViewer
  ==================================
  In order to get set up using the SlideShow component you must
  provide at least 2 configuration options:
   - el: this is the HTML element to target
   - manifest: this is a link to a IIIF manifest.
   A basic configuration might look like:
   slideShow.create(document.getElementById('slideShowEl'), {
      manifestUri: 'http:// ... /',
   });
   You can see the full set of default configuration values printed below in the
   console.
  `);
  console.log(DEFAULT_SLIDESHOW_CONFIG);
};

export {
  create,
  help,
  CanvasDetail,
  CanvasNavigation,
  FullscreenButton,
  MobilePageView,
  MobileViewer,
  PeekComponent,
  ProgressIndicator,
  SimpleSlideTransition,
  Slide,
  SlideShow,
  SwappableViewer,
  TapDetector,
  ZoomButtons,
};
