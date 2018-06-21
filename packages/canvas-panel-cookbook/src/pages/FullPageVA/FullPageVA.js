import React, { Component } from 'react';
import { PopOutViewer } from '@canvas-panel/full-page-plugin';
import AnnWest from '../../Sites/VA/AnnWest';

class FullPageVA extends Component {
  render() {
    return (
      <div>
        <AnnWest>
          <PopOutViewer
            style={{
              background: '#fff',
              marginTop: 40,
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              zIndex: 10,
            }}
            manifest="https://stephenwf.github.io/ocean-liners.json"
            title="Ocean liners"
            innerHtml={`
            <article class="b-promo__item js-object-fit-container">
                <img srcset="https://vanda-production-assets.s3.amazonaws.com/2017/08/01/15/47/37/978393e8-7831-49a3-95f5-582081d674cd/Architecture-thumbnail.jpg 320w, https://vanda-production-assets.s3.amazonaws.com/2017/08/01/15/47/37/d635211e-b323-4f3d-9036-e0883dc995c0/Architecture-thumbnail.jpg 640w, https://vanda-production-assets.s3.amazonaws.com/2017/08/01/15/47/37/23ed1962-2e64-4e12-ad75-fe017b8c409e/Architecture-thumbnail.jpg 960w, https://vanda-production-assets.s3.amazonaws.com/2017/08/01/15/47/37/7b4d123d-36d0-4948-a5cd-dc42fadc6968/Architecture-thumbnail.jpg 1280w" sizes="(min-width: 1200px) 1200px, 100vw" class="b-promo__image" src="https://vanda-production-assets.s3.amazonaws.com/2017/08/01/15/47/37/978393e8-7831-49a3-95f5-582081d674cd/Architecture-thumbnail.jpg" />
                <a class="b-promo__anchor" data-open-viewer href="javascript: void(0)">
                  <div class="b-promo__content">

                    <h1 class="b-promo__type">
                      Interact
                    </h1>

                    <p class="b-promo__title">
                      Take a fascinating tour of the Aquitania's interior
                    </p>

                    <div class="u-btn u-btn--arrowed s-themed s-themed--background-color s-themed--background-color--hover s-themed--border-color s-themed--border-color--hover">
                      Start tour
                    </div>

                  </div>
                </a>
              </article>
          `}
          >
            <p>Full page plugin. Scroll down to start experience.</p>
            <span className="muted">
              © Victoria and Albert Museum, London 2018
            </span>
          </PopOutViewer>
        </AnnWest>
        <style>{`
          .main { transform: none }
        `}</style>
      </div>
    );
  }
}

export default FullPageVA;
