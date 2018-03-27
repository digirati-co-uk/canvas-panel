import React from 'react';
import vamicons from './vamicons.svg';

export default props => {
  return (
    <div className="page-outer js-page-outer theme-egg-yolk">
      <link
        href="https://www.vam.ac.uk/assets/application-edb40d277c900ce86f444ba2b0d36abb8e0bbc9fc2cde5315a5a9d70a2ef0718.css"
        rel="stylesheet"
      />
      <div className="nav">
        <div className="banner js-banner" />
      </div>
      <main className="main">
        <header className="main__banner">
          <div className="main__title">
            <h1 className="main__heading">Ocean Liners: Speed and Style</h1>
            <h2 className="main__teaser qa-exhibition-teaser">
              Discover the romantic and remarkable age of ocean travel
            </h2>
          </div>
          <div className="logo--header">
            <div className="logo">
              <div
                className="logo__container"
                dangerouslySetInnerHTML={{
                  __html:
                    '<svg class="logo__icon themed--color"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' +
                    vamicons +
                    '#valogo-clipped"></use></svg>',
                }}
              />
            </div>
          </div>
        </header>
        <section className="main__content">
          <article className="article">
            <p className="article__leadparagraph">
              Experience a unique journey through the design stories of the
              world's greatest ocean liners, including the Titanic, Normandie,
              the Queen Mary and the Canberra, and find out how these impressive
              vessels helped shape the modern world.
            </p>
            <div className="sir-trevor-text">
              <p>Click the pins to explore the poster in detail:</p>
            </div>
            {props.children}
            <div>
              <br />
              <center>© Victoria and Albert Museum, London 2018</center>
              <br />
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};
