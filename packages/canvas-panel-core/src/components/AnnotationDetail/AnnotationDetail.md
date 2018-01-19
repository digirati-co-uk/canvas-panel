Simple annotation details demo, clicking on an annotation will show a popup box with content customised
for this particular manifest. This could however be expanded greatly into a general purpose annotation reading tool.
```js
let viewport;
const animationSpeed = 4;
initialState = { annotation: null, viewport: null };
<div style={{ padding: 10 }}>
  <div style={{ width: 450, display: 'inline-block' }}>
    <Manifest url={manifests.main}>
      <CanvasProvider startCanvas={72}>
        <Viewport maxWidth={450} setRef={(v) => { viewport = v }}>
          <SingleTileSource viewportController={true}>
            <OpenSeadragonViewport>
              <OpenSeadragonViewer maxHeight={1000} />
             </OpenSeadragonViewport>
          </SingleTileSource>
          <AnnotationCanvasRepresentation 
            ratio={0.1} 
            onClickAnnotation={(annotation, bounds) => { 
              setState({ annotation }); 
              viewport.goToRect(bounds, 300, animationSpeed) 
            }}/> 
        </Viewport>
      </CanvasProvider>
    </Manifest>
  </div>
  <div style={{ width: 300, display: 'inline-block', padding: 30 }}>
    { state.annotation ? (
      <AnnotationDetail 
        annotation={state.annotation} 
        onClose={() => { 
          setState({ annotation: null }); 
          viewport.resetView(animationSpeed); 
        }} 
      />
    ) : 'Click annotation to see more.' }
  </div>
</div>
```
