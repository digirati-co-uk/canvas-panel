import React from 'react';
import vamicons from './vamicons.svg';

const VAMIcon = props => (
  <div
    className={props.className}
    dangerouslySetInnerHTML={{
      __html:
        '<svg class="' +
        props.svgClassName +
        '"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' +
        vamicons +
        '#' +
        props.name +
        '"></use></svg>',
    }}
  />
);

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
            <h1 className="main__heading">
              Inside an ocean liner: the 'Aquitania'{' '}
            </h1>

            <div className="main__articlereference">
              <p className="main__articlereference__ref">
                Produced as part of{' '}
                <span className="main__articlereference__ref__exhibname">
                  Ocean Liners: Speed and Style
                </span>
              </p>
              <p className="main__articlereference__exhibdates">
                On now until Sunday, 17 June 2018
              </p>
              <a
                className="btn btn--themed btn--light"
                href="https://www.vam.ac.uk/exhibitions/ocean-liners-speed-style"
              >
                Find out more
              </a>
            </div>
          </div>
          <div className="logo--header">
            <div className="logo">
              <VAMIcon
                className="logo__container"
                svgClassName="logo__icon themed--color"
                name="valogo-clipped"
              />
            </div>
          </div>
        </header>
        <section className="main__content">
          <article className="article">
            <ul className="article__social">
              <li className="article__social-title">Share</li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Facebook"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://www.vam.ac.uk/articles/inside-an-ocean-liner-aquitania"
                >
                  <div className="social-icon social-icon--onwhite">
                    <VAMIcon
                      className="social-icon__container"
                      svgClassName="social-icon__icon themed--color"
                      name="facebook"
                    />
                  </div>
                </a>{' '}
              </li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Twitter"
                  href="https://twitter.com/home?status=https://www.vam.ac.uk/articles/inside-an-ocean-liner-aquitania"
                >
                  <div className="social-icon social-icon--onwhite">
                    <VAMIcon
                      className="social-icon__container"
                      svgClassName="social-icon__icon themed--color"
                      name="twitter"
                    />
                  </div>
                </a>{' '}
              </li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Pin trest"
                  href="https://pinterest.com/pin/create/button/?url=https://www.vam.ac.uk/articles/inside-an-ocean-liner-aquitania&amp;media=V&amp;amp;A&amp;description="
                >
                  <div className="social-icon social-icon--onwhite">
                    <VAMIcon
                      className="social-icon__container"
                      svgClassName="social-icon__icon themed--color"
                      name="pinterest"
                    />
                  </div>
                </a>{' '}
              </li>
              <li className="article__social-link">
                <a href="http://www.tumblr.com/share/link?url=https://www.vam.ac.uk/articles/inside-an-ocean-liner-aquitania">
                  <div className="social-icon social-icon--onwhite">
                    <VAMIcon
                      className="social-icon__container"
                      svgClassName="social-icon__icon themed--color"
                      name="tumblr"
                    />
                  </div>
                </a>{' '}
              </li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Google Plus"
                  href="https://plus.google.com/share?url=https://www.vam.ac.uk/articles/inside-an-ocean-liner-aquitania"
                >
                  <div className="social-icon social-icon--onwhite">
                    <VAMIcon
                      className="social-icon__container"
                      svgClassName="social-icon__icon themed--color"
                      name="googleplus"
                    />
                  </div>
                </a>{' '}
              </li>
            </ul>
            <p className="article__leadparagraph">
              Known as 'The Ship Beautiful', Cunard Line's 'Aquitania' (1914 –
              1950) was considered one of the most elegant ocean liners of the
              time when it set sail in 1914. A promotional poster from our
              collection features a beautifully illustrated cross-section view
              of the ship's interior.
            </p>
            <div className="sir-trevor-text">
              <p>
                Ocean liners were strictly organised spaces which reflected
                social hierarchies. The<i> Aquitania</i> provided accommodation
                for 3,230 passengers, with 618 in first-class, 614 in
                second-class, and 1,998 in third-class, as well as a crew of
                972. First-class passengers occupied the upper, most-spacious
                areas, while engineers laboured in the boiler room deep down in
                the hull.
              </p>
            </div>
            <div className="sir-trevor-text">
              <p>
                Take a fascinating tour of the <i>Aquitania's</i> interior –
                from promenade deck to boiler room – with our interactive. Click
                on the pins to reveal original photographs and stories about the
                ship's design.{' '}
              </p>
            </div>

            <figcaption className="sir-trevor-image__caption">
              Cunard Line – to all parts of the world, poster, Ulrich Gutersohn,
              about 1920, England. Museum no. E.1829-2004. © Victoria and Albert
              Museum, London
            </figcaption>
            {props.children}

            <figcaption className="sir-trevor-image__caption">
              Cunard Line – to all parts of the world, poster, Ulrich Gutersohn,
              about 1920, England. Museum no. E.1829-2004. © Victoria and Albert
              Museum, London
            </figcaption>

            <section className="b-promo">
              <article
                className="b-promo__item js-object-fit-container"
                style={{
                  backgroundImage:
                    "url('https://vanda-production-assets.s3.amazonaws.com/2018/02/05/13/51/52/210f11b2-dfa0-4b18-9825-04d23a4a29fb/960.jpg')",
                }}
              >
                <a
                  className="b-promo__anchor"
                  data-tracking="promobox-exhibition"
                  href="https://www.vam.ac.uk//exhibitions/ocean-liners-speed-style"
                >
                  <div className="b-promo__content">
                    <h1 className="b-promo__type">Exhibition</h1>

                    <p className="b-promo__title">
                      Ocean Liners: Speed and Style
                    </p>

                    <p className="b-promo__sponsor" />

                    <div className="u-btn u-btn--arrowed s-themed s-themed--background-color s-themed--background-color--hover s-themed--border-color s-themed--border-color--hover">
                      Find out more
                    </div>
                  </div>
                </a>
              </article>
            </section>
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
