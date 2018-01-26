import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Patchwork from './Patchwork';
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
            <NavLink activeClassName="navigation-active" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="navigation-active" to="/patchwork">
              Patchwork
            </NavLink>
          </li>
        </ul>
      </header>

      <Route exact path="/about" component={About} />
      <Route path="/patchwork" component={Patchwork} />
    </main>
  </Router>
);
export default App;
