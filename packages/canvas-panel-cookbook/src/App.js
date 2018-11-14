import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Patchwork from './pages/Patchwork/Patchwork';
import FullPage from './pages/FullPage/FullPage';
import AnnotationPlayground from './pages/AnnotationPlayground/AnnotationPlayground';

import SlideShowExamples from './pages/SlideShow/SlideShowDemo';
import SlideShowDemo from './pages/SlideShowDemo/SlideShowDemo';
import SlideShowFullScreenDemo from './pages/SlideShowFullScreen/SlideShowFullScreenDemo';
import CollectionLister from './pages/CollectionLister/CollectionLister';
import FullPageVA from './pages/FullPageVA/FullPageVA';
import IframeDemo from './pages/IframeDemo/IframeDemo';
import MultiAnnotationCanvas from './pages/MultiAnnotationCanvas/MultiAnnotationCanvas';
import classnames from 'classnames';

import './App.scss';
import PopOut from './PopOut';
import aboutText from '../../../about.md';
import homeText from '../../../introduction.md';
import roadmapText from '../../../roadmap.md';
import logoUrl from './digirati-logo-white.svg';

const RenderMarkdown = props => (
  <section className="article-content">
    <div
      dangerouslySetInnerHTML={{
        __html: props.children.replace(
          /(about|roadmap)\.md/,
          (match, type) => '#/' + type
        ),
      }}
    />
  </section>
);

const AboutText = () => <RenderMarkdown>{aboutText}</RenderMarkdown>;

const HomeText = () => <RenderMarkdown>{homeText}</RenderMarkdown>;

const RoadmapText = () => <RenderMarkdown>{roadmapText}</RenderMarkdown>;

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

class AppHeader extends React.Component {
  state = {
    isMenuVisible: false,
  };
  toggleMenu = () => {
    if (!this.state.isMenuVisible) {
      document.body.addEventListener('click', this.hideMenu);
    }
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };
  hideMenu = () => this.setState({ isMenuVisible: false });
  render() {
    return (
      <header
        className="app-header"
        style={{
          display:
            window.location.hash.indexOf('no-header=1') !== -1 ? 'none' : '',
        }}
      >
        <a
          className={classnames('app-mobile-menu', {
            'app-mobile-menu--open': this.state.isMenuVisible,
          })}
          onClick={this.toggleMenu}
        />
        <ul className="app-navigation">
          <li className="app-brand">
            <i className="app-mobile-menu-icon" />
            <NavLink activeClassName="navigation-active" to="/">
              Canvas Panel
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/roadmap">
              Road map
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/examples">
              Examples
            </NavLink>
          </li>
          <li>
            <a href="/styleguide">Documentation</a>
          </li>

          <li className="logo-item">
            <a href="https://digirati.com/" target="_blank">
              <img
                className="app-logo"
                src={logoUrl}
                alt="created by Digirati"
              />
            </a>
          </li>
        </ul>
      </header>
    );
  }
}

const App = () => (
  <Router>
    <article>
      <AppHeader />
      <Route component={ScrollToTop} />
      <Route exact path="/" component={HomeText} />
      <Route exact path="/about" component={AboutText} />
      <Route exact path="/roadmap" component={RoadmapText} />
      <Route exact path="/examples" component={CollectionLister} />
      <Route path="/examples/oceanliners" component={Patchwork} />
      <Route path="/examples/fullpage" component={FullPage} />
      <Route path="/examples/fullpage-va" component={FullPageVA} />
      <Route path="/examples/popout" component={PopOut} />
      <Route path="/examples/external" component={IframeDemo} />
      <Route
        path="/examlpes/multi-annotation-canvas"
        component={MultiAnnotationCanvas}
      />
      <Route
        path="/examples/annotation-playground"
        component={AnnotationPlayground}
      />
      <Route path="/examples/slide-show" component={SlideShowExamples} />
      <Route
        path="/examples/slideshow-fullscreen"
        component={SlideShowFullScreenDemo}
      />
      <Route path="/examples/slideshow-demo" component={SlideShowDemo} />
    </article>
  </Router>
);

export default App;
