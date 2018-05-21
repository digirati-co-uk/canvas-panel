Simple annotation details demo, clicking on an annotation will show a popup box with content customised
for this particular manifest. This could however be expanded greatly into a general purpose annotation reading tool.

```js
let viewport;
const animationSpeed = 1;
initialState = { annotation: null, viewport: null };
<div style={{ padding: 10 }}>
  <div style={{ width: 450, display: 'inline-block' }}>
    <Bem cssClassMap={{ annotation: 'annotation-detail-md-annotation' }}>
      <Manifest url={manifests.main}>
        <CanvasProvider startCanvas={72}>
          <Viewport
            maxWidth={450}
            setRef={v => {
              viewport = v;
            }}
          >
            <SingleTileSource viewportController={true}>
              <OpenSeadragonViewport>
                <OpenSeadragonViewer maxHeight={1000} />
              </OpenSeadragonViewport>
            </SingleTileSource>
            <AnnotationCanvasRepresentation
              ratio={0.1}
              growthStyle="fixed"
              bemModifiers={annotation => ({
                selected: state.annotation
                  ? state.annotation.id === annotation.id
                  : null,
              })}
              onClickAnnotation={(annotation, bounds) => {
                setState({ annotation });
                viewport.goToRect(bounds, 300, animationSpeed);
              }}
            />
          </Viewport>
        </CanvasProvider>
      </Manifest>
    </Bem>
    <style>{`
      .annotation-detail-md-annotation {
        pointer-events: visible;
        outline: 2px solid purple;
      }
      .annotation-detail-md-annotation--selected {
        outline: 2px solid orange;
      }
      `}</style>
  </div>
  <div style={{ width: 300, display: 'inline-block', padding: 30 }}>
    {state.annotation ? (
      <AnnotationDetail
        annotation={state.annotation}
        onClose={() => {
          setState({ annotation: null });
          viewport.resetView(animationSpeed);
        }}
      />
    ) : (
      'Click annotation to see more.'
    )}
  </div>
</div>;
```

### p3 Example

```js
let viewport;
const animationSpeed = 1;
initialState = { annotation: null, viewport: null };
<div style={{ padding: 10 }}>
  <div style={{ width: 450, display: 'inline-block' }}>
    <Manifest jsonLd={manifests.p3manifest}>
      <CanvasProvider>
        <Viewport
          maxWidth={450}
          setRef={v => {
            viewport = v;
          }}
        >
          <SingleTileSource viewportController={true}>
            <OpenSeadragonViewport>
              <OpenSeadragonViewer maxHeight={1000} />
            </OpenSeadragonViewport>
          </SingleTileSource>
          <AnnotationCanvasRepresentation
            ratio={0.1}
            onClickAnnotation={(annotation, bounds) => {
              setState({ annotation });
              viewport.goToRect(bounds, 1000, animationSpeed);
            }}
            annotationStyle={{
              outline: '10px solid lime',
              pointerEvents: 'visible',
            }}
          />
        </Viewport>
      </CanvasProvider>
    </Manifest>
  </div>
  <div style={{ width: 300, display: 'inline-block', padding: 30 }}>
    {state.annotation ? (
      <AnnotationDetail
        annotation={state.annotation}
        onClose={() => {
          setState({ annotation: null });
          viewport.resetView(animationSpeed);
        }}
      />
    ) : (
      'Click annotation to see more.'
    )}
  </div>
</div>;
```
