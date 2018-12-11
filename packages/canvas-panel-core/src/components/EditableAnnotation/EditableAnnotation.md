Editable annotation bounding box example, demonstrates the drag and drop and resize functionality, which works with both, mouse and touch devices.

```js
let viewport;
const ratio = 0.5;
initialState = {
  annotation: {
    target: 'https://digirati.com/test/c1',
    x: 100.33,
    y: 100.33,
    width: 200.33,
    height: 200.66,
  },
};
<div>
  <div style={{ background: 'grey', position: 'relative', userSelect: 'none' }}>
    <Manifest url={manifests.main}>
      <CanvasProvider>
        <SingleTileSource>
          <Viewport
            maxHeight={600}
            setRef={v => {
              viewport = v;
            }}
          >
            <OpenSeadragonViewport viewportController={true}>
              <OpenSeadragonViewer maxHeight={1000} />
            </OpenSeadragonViewport>
            <CanvasRepresentation ratio={ratio}>
              <EditableAnnotation
                {...state.annotation}
                ratio={ratio}
                setCoords={xywh => {
                  setState({
                    annotation: {
                      ...state.annotation,
                      ...xywh,
                    },
                  });
                }}
              />
            </CanvasRepresentation>
          </Viewport>
        </SingleTileSource>
      </CanvasProvider>
    </Manifest>
    <div
      style={{
        position: 'absolute',
        background: '#fff',
        padding: 5,
        opacity: 0.7,
        top: 0,
        right: 0,
        zIndex: 12,
      }}
    >
      Annotation: <br />
      <b> x:</b> {state.annotation.x} <br />
      <b> y:</b> {state.annotation.y} <br />
      <b> height:</b> {state.annotation.height} <br />
      <b> width:</b> {state.annotation.width} <br />
    </div>
  </div>
</div>;
```

### Custom box styles

Custom box styles can be passed to the `EditableAnnotation` component using `boxStyles` property. The standard `className` attribute also available.

```js
let viewport;
const ratio = 0.5;
initialState = {
  annotation: {
    target: 'https://digirati.com/test/c1',
    x: 100.33,
    y: 100.33,
    width: 200.33,
    height: 200.66,
  },
};
<div>
  <div style={{ background: 'grey', userSelect: 'none' }}>
    <Manifest url={manifests.main}>
      <CanvasProvider>
        <SingleTileSource>
          <Viewport
            maxHeight={600}
            setRef={v => {
              viewport = v;
            }}
          >
            <OpenSeadragonViewport viewportController={true}>
              <OpenSeadragonViewer maxHeight={1000} />
            </OpenSeadragonViewport>
            <CanvasRepresentation ratio={ratio}>
              <EditableAnnotation
                {...state.annotation}
                ratio={ratio}
                setCoords={xywh => {
                  setState({
                    annotation: {
                      ...state.annotation,
                      ...xywh,
                    },
                  });
                }}
                boxStyles={{
                  outline: '2px dashed red',
                  background: 'rgba(255,255,255,.4)',
                }}
              />
            </CanvasRepresentation>
          </Viewport>
        </SingleTileSource>
      </CanvasProvider>
    </Manifest>
  </div>
</div>;
```

### Adding annotations dynamically

```js
let viewport;
const ratio = 0.5;
initialState = { annotations: [] };
<div>
  <div>
    <button
      onClick={() => {
        setState({
          annotations: [
            ...state.annotations,
            {
              target: 'https://digirati.com/test/c1',
              x: 100.33,
              y: 100.33,
              width: 200.33,
              height: 200.66,
            },
          ],
        });
      }}
    >
      Add Annotation
    </button>
  </div>
  <div style={{ background: 'grey', userSelect: 'none' }}>
    <Manifest url={manifests.main}>
      <CanvasProvider>
        <SingleTileSource>
          <Viewport
            maxHeight={600}
            setRef={v => {
              viewport = v;
            }}
          >
            <OpenSeadragonViewport viewportController={true}>
              <OpenSeadragonViewer maxHeight={1000} />
            </OpenSeadragonViewport>
            <CanvasRepresentation ratio={ratio}>
              {state.annotations.map((annotation, idx) => (
                <EditableAnnotation
                  key={idx}
                  {...annotation}
                  ratio={ratio}
                  setCoords={(annotationIdx => xywh => {
                    const newAnnotations = JSON.parse(
                      JSON.stringify(state.annotations)
                    );
                    newAnnotations[annotationIdx] = {
                      ...state.annotations[annotationIdx],
                      ...xywh,
                    };
                    setState({
                      annotations: newAnnotations,
                    });
                  })(idx)}
                />
              ))}
            </CanvasRepresentation>
          </Viewport>
        </SingleTileSource>
      </CanvasProvider>
    </Manifest>
  </div>
</div>;
```
