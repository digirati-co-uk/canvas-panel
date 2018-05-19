import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Patchwork from './pages/Patchwork/Patchwork';
import FullPagePatchwork from './pages/FullPagePatchwork/FullPagePatchwork';
import AnnotationPlayground from './pages/AnnotationPlayground/AnnotationPlayground';
import './App.scss';
import PopOut from './PopOut';
import aboutText from '../../../about.md';
import homeText from '../../../introduction.md';
import roadmapText from '../../../roadmap.md';
import logoUrl from './digirati-logo-white.svg';

const RenderMarkdown = props => (
  <section
    style={{ maxWidth: 1100, margin: 'auto', padding: 30, lineHeight: '1.8em' }}
  >
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

const Examples = examples => () => (
  <section style={{ maxWidth: 1100, margin: 'auto', padding: 30 }}>
    {examples.map(({ label, link, image }, key) => (
      <NavLink activeClassName="navigation-active" to={link} key={key}>
        <article style={{ width: '33.3333%', float: 'left', padding: 30 }}>
          <div
            style={{
              height: 200,
              background: '#ddd',
              backgroundSize: 'cover',
              backgroundImage: `url(${image}`,
            }}
          />
          <h3>{label}</h3>
        </article>
      </NavLink>
    ))}
  </section>
);

const exampleList = [
  {
    label: 'V&A Ocean Liners',
    link: '/examples/oceanliners',
    image:
      'https://vanda-production-assets.s3.amazonaws.com/2018/03/14/12/54/22/445782b9-4b20-405b-9f99-54f15974aeb0/ocean-liners-conference-rescheduled_960.jpg',
  },
  {
    label: 'Full page example',
    link: '/examples/fullpage',
    image:
      'https://framemark.vam.ac.uk/collections/2013GU2911/1536,2048,512,256/512,/0/default.jpg',
  },
  {
    label: 'Pop out example',
    link: '/examples/popout',
    image:
      'https://framemark.vam.ac.uk/collections/2013GU2911/2048,4580,1024,512/512,/0/default.jpg',
  },
  {
    label: 'Annotation playground',
    link: '/examples/annotation-playground',
    image: null,
  },
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
          <li className="app-brand">
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
      <Route component={ScrollToTop} />
      <Route exact path="/" component={HomeText} />
      <Route exact path="/about" component={AboutText} />
      <Route exact path="/roadmap" component={RoadmapText} />
      <Route exact path="/examples" component={Examples(exampleList)} />
      <Route path="/examples/oceanliners" component={Patchwork} />
      <Route path="/examples/fullpage" component={FullPagePatchwork} />
      <Route path="/examples/popout" component={PopOut} />
      <Route
        path="/examples/annotation-playground"
        component={AnnotationPlayground}
      />
    </main>
  </Router>
);
export default App;
