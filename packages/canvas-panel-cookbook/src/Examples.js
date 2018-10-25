import React from 'react';
import { NavLink } from 'react-router-dom';

import './Examples.scss';

const Examples = examples => lazy => (
  <section className="canvas-panels-examples-list">
    {examples.map(({ label, link, image }, key) => (
      <NavLink activeClassName="navigation-active" to={link} key={key}>
        <article className="canvas-panel-example">
          <div
            className="canvas-panel-example__image"
            style={{
              backgroundImage: lazy === true ? '' : `url(${image})`,
            }}
            data-background-img={`url(${image})`}
          />
          <h3>{label}</h3>
        </article>
      </NavLink>
    ))}
  </section>
);

export default Examples;
