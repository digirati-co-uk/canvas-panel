import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import Patchwork from './Patchwork';
import FullPagePatchwork from './FullPagePatchwork';
import './App.css';

const About = () => (
  <section>
    <h2>Canvas Panel Cookbook</h2>
    <p>
      This site shows various examples of the experiences you can make with
      Canvas Panel.
    </p>
  </section>
);

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
            <NavLink activeClassName="navigation-active" to="/patchwork">
              Patchwork
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/fullpage">
              Full page
            </NavLink>
          </li>
          <li>
            <a href="/styleguide">Documentation</a>
          </li>
        </ul>
      </header>

      <Route exact path="/about" component={About} />
      <Route path="/patchwork" component={Patchwork} />
      <Route path="/fullpage" component={FullPagePatchwork} />
    </main>
  </Router>
);
export default App;
