import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Patchwork from './Patchwork';
import FullPagePatchwork from './FullPagePatchwork';
import './App.css';
import PopOut from './PopOut';
import aboutText from '../../../about.md';
import homeText from '../../../introduction.md';

const RenderMarkdown = props => (
  <section
    style={{ maxWidth: 1100, margin: 'auto', padding: 30, lineHeight: '1.8em' }}
  >
    <div
      dangerouslySetInnerHTML={{
        __html: props.children.replace(/"about.md"/, '#/about'),
      }}
    />
  </section>
);

const AboutText = () => <RenderMarkdown>{aboutText}</RenderMarkdown>;

const HomeText = () => <RenderMarkdown>{homeText}</RenderMarkdown>;

const Examples = examples => () => (
  <section style={{ maxWidth: 1100, margin: 'auto', padding: 30 }}>
    {examples.map(({ label, link }, key) => (
      <NavLink activeClassName="navigation-active" to={link} key={key}>
        <article style={{ width: '33.3333%', float: 'left', padding: 30 }}>
          <div style={{ height: 200, background: '#ddd' }} />
          <h3>{label}</h3>
        </article>
      </NavLink>
    ))}
  </section>
);

const exampleList = [
  { label: 'Patchwork example', link: '/examples/patchwork' },
  { label: 'Full page example', link: '/examples/fullpage' },
  { label: 'Pop out example', link: '/examples/popout' },
];

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const App = () => (
  <Router>
    <main>
      <header>
        <ul className="app-navigation">
          <li>
            <NavLink activeClassName="navigation-active" to="/">
              Cookbook
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/about">
              About
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
        </ul>
      </header>
      <Route component={ScrollToTop} />
      <Route exact path="/" component={HomeText} />
      <Route exact path="/about" component={AboutText} />
      <Route exact path="/examples" component={Examples(exampleList)} />
      <Route path="/examples/patchwork" component={Patchwork} />
      <Route path="/examples/fullpage" component={FullPagePatchwork} />
      <Route path="/examples/popout" component={PopOut} />
    </main>
  </Router>
);
export default App;
