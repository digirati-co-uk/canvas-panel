Editable Annotation Bounding Box Example

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
      Add POI
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
                  setCoords={(annotationIdx => obj => {
                    const newAnnotations = JSON.parse(
                      JSON.stringify(state.annotations)
                    );
                    newAnnotations[annotationIdx] = {
                      ...state.annotations[annotationIdx],
                      ...obj,
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
