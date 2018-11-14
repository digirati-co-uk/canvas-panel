import React from 'react';
import {
  Manifest,
  CanvasProvider,
  CanvasRepresentation,
  EditableAnnotation,
  AnnotationListProvider,
  AnnotationProvider,
  Viewport,
  SingleTileSource,
  FullPageViewport,
  OpenSeadragonViewport,
  OpenSeadragonViewer,
} from '@canvas-panel/core';
import test from './test.json';
const ratio = 0.1;
const MultiAnnotationCanvas = props => (
  <Manifest jsonLd={test}>
    <CanvasProvider startCanvas={0}>
      {({ canvas }) => (
        <CanvasRepresentation
          ratio={ratio}
          canvas={canvas}
          style={{ border: '1px solid red' }}
        >
          {canvas.__jsonld.items[0].items
            .filter(annotation => annotation.motivation === 'painting')
            .map((annotation, key) => {
              const [_xywh, _x, _y, _w, _h] = annotation.target.match(
                /xywh=(\d+),(\d+),(\d+),(\d+)/
              );
              const thisCanvas = canvas;
              return (
                <EditableAnnotation
                  key={key}
                  ratio={ratio}
                  {...{ canvas }}
                  x={parseInt(_x, 10)}
                  y={parseInt(_y, 10)}
                  width={parseInt(_w, 10)}
                  height={parseInt(_h, 10)}
                  setCoords={xywh => {
                    annotation.target = annotation.target.replace(
                      /xywh=(\d+),(\d+),(\d+),(\d+)/,
                      `xywh=${xywh.x},${xywh.y},${xywh.width},${xywh.height}`
                    );
                  }}
                >
                  {annotation.body.type === 'TextualBody' ? (
                    <span>{annotation.body.value}</span>
                  ) : annotation.body.type === 'Image' ? (
                    <img
                      src={
                        annotation.body.service && annotation.body.service.id
                          ? annotation.body.service.id
                          : 'https://picsum.photos/g/200/300'
                      }
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  ) : annotation.body.type === 'Video' ? (
                    <video
                      controls
                      name="media"
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    >
                      <source
                        src={
                          annotation.body.service && annotation.body.service.id
                            ? annotation.body.service.id
                            : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
                        }
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    'Not supported'
                  )}
                </EditableAnnotation>
              );
            })}
        </CanvasRepresentation>
      )}
    </CanvasProvider>
  </Manifest>
);

export default MultiAnnotationCanvas;
