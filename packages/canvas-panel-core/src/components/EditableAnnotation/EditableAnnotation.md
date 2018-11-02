Editable annotation bounding box example, demonstrates the drag and drop and resize functionality.

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
  <div style={{ background: 'grey' }}>
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
  </div>
</div>;
```

### Custom box styles

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
  <div style={{ background: 'grey' }}>
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
  <div style={{ background: 'grey' }}>
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
