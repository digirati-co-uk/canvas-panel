import React, { Component } from 'react';
import Async from 'react-promise';
import Upgrader from 'iiif-prezi2to3';
import Examples from '../../Examples';
import QueryStringProvider from '../../QueryStringProvider';
import './CollectionLister.scss';

const IIIF_PRESENTATION_V3_CONTEXT =
  'http://iiif.io/api/presentation/3/context.json';

function upgradeCollectionToPresentationV3IfNecessary(collection) {
  let context = collection['@context'];
  let needsConversion = false;
  if (context) {
    if (context.constructor === Array) {
      needsConversion = !context.includes(IIIF_PRESENTATION_V3_CONTEXT);
    } else if (context.constructor === String) {
      needsConversion = context !== IIIF_PRESENTATION_V3_CONTEXT;
    }
  }
  if (needsConversion) {
    return new Upgrader({
      deref_links: false,
    }).processResource(collection, true);
  } else {
    return collection;
  }
}

const DEMOPAGES = [
  'oceanliners',
  'fullpage',
  'fullpage-va',
  'popout',
  'annotation-playground',
  'slideshow-fullscreen',
  'slideshow-demo',
  'slide-show',
];

export default class CollectionLister extends QueryStringProvider {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.thumbnailLazyInterval = setInterval(() => {
      [].slice
        .call(document.querySelectorAll('[data-background-img]'))
        .forEach(element => {
          const bounds = element.getBoundingClientRect();
          if (
            element.style.backgroundImage === '' &&
            window.innerHeight * 1.5 > bounds.top
          ) {
            element.style.backgroundImage = element.getAttribute(
              'data-background-img'
            );
          }
        });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.thumbnailLazyInterval);
  }
  render() {
    const self = this;
    if (
      this.urlParams.hasOwnProperty('collection') &&
      this.urlParams.collection.constructor === String
    ) {
      this.collectionURL = this.urlParams.collection;
    } else {
      this.collectionURL =
        'https://adam-digirati.github.io/canvas-panel-examples.json';
    }

    let collectionPromise = fetch(this.collectionURL)
      .then(response => response.json())
      .then(collection =>
        upgradeCollectionToPresentationV3IfNecessary(collection)
      );

    return (
      <div className="container">
        <Async
          promise={collectionPromise}
          then={val => {
            const exampleList = (val.items || []).map(iiifEntity => {
              let listItem = {};
              if (iiifEntity.thumbnail && iiifEntity.thumbnail.length > 0) {
                listItem.image = iiifEntity.thumbnail[0].id;
              } else {
                listItem.image = 'https://picsum.photos/320/200';
              }
              if (
                iiifEntity.label &&
                iiifEntity.label.en &&
                iiifEntity.label.en.length > 0
              ) {
                listItem.label = iiifEntity.label.en[0];
              } else if (
                iiifEntity.label &&
                Object.keys(iiifEntity.label).length > 0 &&
                iiifEntity.label[Object.keys(iiifEntity.label)[0]].length > 0
              ) {
                listItem.label =
                  iiifEntity.label[Object.keys(iiifEntity.label)[0]][0];
              } else {
                listItem.label = iiifEntity.id;
              }
              let demopage = 'slideshow-demo';
              if (self.urlParams.demopage && DEMOPAGES.includes(demopage)) {
                demopage = self.urlParams.demopage;
              } else if (
                iiifEntity.behavior &&
                iiifEntity.behavior.constructor === Array
              ) {
                for (let behavior of iiifEntity.behavior) {
                  if (DEMOPAGES.includes(behavior)) {
                    demopage = behavior;
                    break;
                  }
                }
              }
              const eId = iiifEntity.id;
              if (iiifEntity.type === 'Collection') {
                listItem.link = `/examples?demopage=${demopage}&collection=${eId}`;
              } else {
                listItem.link = `/examples/${demopage}?manifest=${eId}`;
              }
              return listItem;
            });
            return Examples(exampleList)(true);
          }}
        />
      </div>
    );
  }
}
