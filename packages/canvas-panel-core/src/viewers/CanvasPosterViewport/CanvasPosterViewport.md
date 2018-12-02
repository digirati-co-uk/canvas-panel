## Multiple Painting Annotations on a Single Canvas as a Thumbnail

```js
<Manifest url="https://adam-digirati.github.io/multi-tile-source.json">
  <CanvasProvider startCanvas={0}>
    {({ canvas, ...props }) => {
      return (
        <MultipleTileSources
          annotationFilter={annotation => annotation.motivation === 'painting'}
          canvas={canvas}
        >
          <CanvasPosterViewport canvas={canvas} />
        </MultipleTileSources>
      );
    }}
  </CanvasProvider>
</Manifest>
```

```js
<Manifest url="https://adam-digirati.github.io/balenciaga1.json">
  <CanvasProvider startCanvas={0}>
    {({ canvas, ...props }) => {
      return (
        <MultipleTileSources
          annotationFilter={annotation => annotation.motivation === 'painting'}
          canvas={canvas}
        >
          <CanvasPosterViewport canvas={canvas} />
        </MultipleTileSources>
      );
    }}
  </CanvasProvider>
</Manifest>
```
