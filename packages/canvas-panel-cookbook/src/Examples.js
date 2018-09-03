import React from 'react';
import { NavLink } from 'react-router-dom';

const Examples = examples => lazy => (
  <section style={{ maxWidth: 1100, margin: 'auto', padding: 30 }}>
    {examples.map(({ label, link, image }, key) => (
      <NavLink activeClassName="navigation-active" to={link} key={key}>
        <article style={{ width: '33.3333%', float: 'left', padding: 30 }}>
          <div
            style={{
              height: 200,
              background: '#ddd',
              backgroundSize: 'cover',
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
