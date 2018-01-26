import React from 'react';
import vamicons from './vamicons.svg';

export default props => {
  return (
    <div className="page-outer js-page-outer theme-angry-yellow">
      <link
        href="https://www.vam.ac.uk/assets/application-19735e2f815f7d21b69c7a1d85d75f47f79f274ba6a510df148ea4a0046544f1.css"
        rel="stylesheet"
      />
      <div className="nav">
        <div className="banner js-banner" />
      </div>
      <main className="main">
        <header className="main__banner">
          <div className="main__title">
            <h1 className="main__heading">Ann West's patchwork</h1>
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
              This vibrant example of 19th-century patchwork depicts a mixture
              of biblical stories and scenes of ordinary people going about
              their daily business, revealing a glimpse of life in rural
              England. It is made from offcuts of coats and military uniforms,
              decorated with woollen appliqué (pieces of fabric sewn on to a
              larger piece to form a picture) and embroidered details, including
              the words 'Ann West's work', and the date, 1820 – a clue to the
              maker's identity.
            </p>
            <div className="sir-trevor-text">
              <p>Click the pins to explore the patchwork in detail:</p>
            </div>
            {props.children}
            <figcaption class="sir-trevor-image__caption">
              Patchwork hanging, Ann West, 1820, England. Museum no. T.23-2007.
              © Victoria and Albert Museum, London
            </figcaption>
            <div className="sir-trevor-calltoaction">
              <a
                href="https://www.vam.ac.uk/collections/quilting-and-patchwork"
                className="btn btn--themed btn--block"
              >
                Discover more quilting and patchwork
              </a>
            </div>
            <div className="sir-trevor-text">
              <p>
                The patchwork features 64 brightly coloured woollen panels,
                centred around the biblical scene of Adam naming the animals in
                the Garden of Eden. It was probably intended to hang on a wall,
                possibly of a nursery or Sunday school. Captions have been
                carefully embroidered over the appliqué scenes, often quoting
                the bible or adding playful personal touches. The smaller
                squares reveal the social mix of a town in early 19th-century
                England: from shepherds and milkmaids to a well-dressed
                sportsman, a 'distressed widow' and a 'poor sailor'. <br />
              </p>
            </div>
            <figure className="sir-trevor-image sir-trevor-image--showcase">
              <img
                srcset="https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/12/39b3de74-783a-48f4-9931-ebf20747da53/Ann-West-animals-CROPPED.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/12/065be8c1-d865-498e-a44a-4079619f041e/Ann-West-animals-CROPPED.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/12/29f1db0b-27c0-43a9-ac0f-f4ff91d2e7db/Ann-West-animals-CROPPED.jpg 960w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/12/467a14f5-b7de-4405-b4e8-ed7f0f17db8e/Ann-West-animals-CROPPED.jpg 1280w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/13/dcfea7f0-7f79-44d8-86c4-f419f4c1cbb4/Ann-West-animals-CROPPED.jpg 1920w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/13/a776672e-7a5e-450e-a9df-5611ad60b5d7/Ann-West-animals-CROPPED.jpg 2560w"
                sizes="(min-width: 1250px) 1130px, (min-width: 800px) calc(100vw - 144px), 100vw"
                className="sir-trevor-image__source"
                src="https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/31/12/39b3de74-783a-48f4-9931-ebf20747da53/Ann-West-animals-CROPPED.jpg"
                alt="Ann west animals cropped"
              />

              <figcaption className="sir-trevor-image__caption">
                Patchwork hanging (detail), Ann West, 1820, England. Museum no.
                T.23-2007. © Victoria and Albert Museum, London
              </figcaption>
            </figure>
            <div className="sir-trevor-text">
              <p>
                <b>Who was Ann West?</b>
                <br />The handwriting embroidered on the hanging suggests Ann
                West was a well-educated woman, with access to a wide-range of
                source imagery, including exotic animals and birds. The phrases
                "Forget me not" and "Remember me" are stitched among the
                patchwork's delicate imagery, suggesting she wanted her work to
                survive as a personal memento. But Ann West was a common name –
                identifying her almost 200 years later has proved difficult. A
                family story suggested that Ann West worked at Longleat (the
                Marquess of Bath's country estate), and the patchwork has long
                been associated with the Wiltshire town of Warminster, four
                miles away – although no records survive to confirm this.
              </p>
            </div>
            <figure className="sir-trevor-image sir-trevor-image--inline">
              <img
                srcset="https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/46/51012e3e-67d9-4e88-97cb-1e3cffb2cb0d/Ann-West-signature-2-CROP.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/46/61c25cd0-7e06-44b5-a659-106c9845fb87/Ann-West-signature-2-CROP.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/46/5dc373b7-6a30-49a5-b6a8-472b27ef54ec/Ann-West-signature-2-CROP.jpg 960w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/47/d8fad7ef-4a5f-4f7f-8513-7bbf1072100b/Ann-West-signature-2-CROP.jpg 1280w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/47/2a115d7d-79ad-44b2-8962-f4f6a0d88af1/Ann-West-signature-2-CROP.jpg 1920w, https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/47/816b4fd7-4691-4a91-b64a-b7d083d6e760/Ann-West-signature-2-CROP.jpg 2560w"
                sizes="(min-width: 689px) 689px, 100vw"
                className="sir-trevor-image__source"
                src="https://vanda-production-assets.s3.amazonaws.com/2018/01/09/11/33/46/51012e3e-67d9-4e88-97cb-1e3cffb2cb0d/Ann-West-signature-2-CROP.jpg"
                alt="Ann west signature 2 crop"
              />

              <figcaption className="sir-trevor-image__caption">
                Patchwork hanging (detail), Ann West, 1820, England. Museum no.
                T.23-2007. © Victoria and Albert Museum, London
              </figcaption>
            </figure>
            <div className="sir-trevor-text">
              <p>
                Another possibility is an Ann West who lived in the Wiltshire
                village of North Bradley, and was identified in the 1841 census
                as a 'tailoress'. She was born Ann Love Collier, in Rode,
                Somerset, in 1761, and married Edward West, also a tailor, in
                1783. This might account for the materials used in the hanging:
                off-cuts from fine blue-black cloth used for tailored coats,
                scarlet for army uniforms and other woollen fabrics from
                ordinary garments and blankets – products of the cloth-weaving
                industry which were then vital to the prosperity of southwest
                England.<b />
                <b />
                <b>
                  <br />
                  <br />
                </b>In 19th-century England, patchwork played an important role
                outside the home. Some of the most inventive examples were
                produced for exhibition and display, often illustrating
                political events and military heroes. Others promoted Victorian
                values of perserverance and hard work, or showed off individual
                skill. The scenes on Ann West's hanging are similar to the
                illustrations used in schoolrooms and nurseries, suggesting it
                may have been intended as a children's teaching aid – with the
                message that Christ came to save all humanity, regardless of
                racial origin or place in society. Its combination of detail and
                humour continue to fascinate today.
              </p>
            </div>
            <div className="sir-trevor-text">
              <p>
                Ann West's patchwork is on display in our Fashion gallery (<a href="http://www.vam.ac.uk/features/digitalmap/#l=1&amp;r=room40">
                  Room 40
                </a>)
              </p>
            </div>
            <div className="sir-trevor-text">
              <p>
                See more amazing V&amp;A objects in incredible detail with
                <a href="https://www.google.com/culturalinstitute/beta/partner/victoria-and-albert-museum">
                  Google Arts and Culture
                </a>
              </p>
            </div>
            <div className="sir-trevor-calltoaction">
              <a
                href="https://www.vam.ac.uk/collections/quilting-and-patchwork"
                className="btn btn--themed btn--block"
              >
                Discover more quilting and patchwork
              </a>
            </div>
            <ul className="article__social article__social--row">
              <li className="article__social-title">Share this article</li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Facebook"
                  href="https://www.facebook.com/sharer/sharer.php?u=https://www.vam.ac.uk/articles/ann-wests-patchwork"
                >
                  <div className="social-icon social-icon--onwhite">
                    <div
                      className="social-icon__container"
                      dangerouslySetInnerHTML={{
                        __html: `
                        <svg class="social-icon__icon themed--color">
                          <use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="${vamicons}#facebook"
                          />
                        </svg>
                      `,
                      }}
                    />
                  </div>
                </a>
              </li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Twitter"
                  href="https://twitter.com/home?status=https://www.vam.ac.uk/articles/ann-wests-patchwork"
                >
                  <div className="social-icon social-icon--onwhite">
                    <div
                      className="social-icon__container"
                      dangerouslySetInnerHTML={{
                        __html: `
                        <svg class="social-icon__icon themed--color">
                          <use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="${vamicons}#twitter"
                          />
                        </svg>
                      `,
                      }}
                    />
                  </div>
                </a>
              </li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Pin trest"
                  href="https://pinterest.com/pin/create/button/?url=https://www.vam.ac.uk/articles/ann-wests-patchwork&amp;media=V&amp;amp;A&amp;description="
                >
                  <div className="social-icon social-icon--onwhite">
                    <div
                      className="social-icon__container"
                      dangerouslySetInnerHTML={{
                        __html: `
                        <svg class="social-icon__icon themed--color">
                          <use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="${vamicons}#pinterest"
                          />
                        </svg>
                      `,
                      }}
                    />
                  </div>
                </a>
              </li>
              <li className="social_links__icons__icon">
                <a href="http://www.tumblr.com/share/link?url=https://www.vam.ac.uk/articles/ann-wests-patchwork">
                  <div className="social-icon social-icon--onwhite">
                    <div className="social-icon__container">
                      <div
                        className="social-icon__container"
                        dangerouslySetInnerHTML={{
                          __html: `
                        <svg class="social-icon__icon themed--color">
                          <use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="${vamicons}#tumblr"
                          />
                        </svg>
                      `,
                        }}
                      />
                    </div>
                  </div>
                </a>
              </li>
              <li className="article__social-link">
                <a
                  aria-label="Share on Google Plus"
                  href="https://plus.google.com/share?url=https://www.vam.ac.uk/articles/ann-wests-patchwork"
                >
                  <div className="social-icon social-icon--onwhite">
                    <div
                      className="social-icon__container"
                      dangerouslySetInnerHTML={{
                        __html: `
                        <svg class="social-icon__icon themed--color">
                          <use
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xlink:href="${vamicons}#googleplus"
                          />
                        </svg>
                      `,
                      }}
                    />
                  </div>
                </a>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
};
