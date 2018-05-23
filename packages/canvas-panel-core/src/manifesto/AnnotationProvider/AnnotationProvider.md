Annotation provider requires an `annotationList` to be provided either from a
Provider or through its props.

The annotation provider takes an annotation and adds extra information. You get the
annotations as an array which you can loop through.

You can extract the information and display it out, no viewer required.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={82}>
    <CanvasNavigation />
    <AnnotationListProvider>
      <AnnotationProvider>
        {({ annotations }) =>
          annotations.map(({ annotation, on }, key) => (
            <ul key={key}>
              <li>
                <strong>ID:</strong> {annotation.getProperty('@id')}
              </li>
              <li>
                <strong>Motivation:</strong>{' '}
                {annotation.getMotivation().toString()}
              </li>
              <li>
                <strong>On:</strong> {on.source}
                <ul>
                  <li>
                    <strong>X: </strong> {on.selector.x}
                  </li>
                  <li>
                    <strong>Y: </strong> {on.selector.y}
                  </li>
                  <li>
                    <strong>Height: </strong> {on.selector.height}
                  </li>
                  <li>
                    <strong>Width: </strong> {on.selector.width}
                  </li>
                </ul>
              </li>
            </ul>
          ))
        }
      </AnnotationProvider>
    </AnnotationListProvider>
  </CanvasProvider>
</Manifest>
```

Or you can you use it to compose a [CanvasRepresentation](#canvasrepresentation) and paint
the annotations to the canvas space.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={82}>
    <CanvasNavigation />
    <Viewport maxWidth={500}>
      <SingleTileSource viewportController={true}>
        <OpenSeadragonViewport>
          <OpenSeadragonViewer maxHeight={1000} />
        </OpenSeadragonViewport>
      </SingleTileSource>
      <AnnotationListProvider ratio={0.1} scale={1}>
        <AnnotationProvider>
          {({ annotations, ...props }) => (
            <CanvasRepresentation {...props}>
              {annotations.map(({ annotation, on }, key) => (
                <Annotation
                  key={key}
                  x={on.selector.x}
                  y={on.selector.y}
                  height={on.selector.height}
                  width={on.selector.width}
                  annotation={annotation}
                  style={{ border: '4px solid red' }}
                />
              ))}
            </CanvasRepresentation>
          )}
        </AnnotationProvider>
      </AnnotationListProvider>
    </Viewport>
  </CanvasProvider>
</Manifest>
```
