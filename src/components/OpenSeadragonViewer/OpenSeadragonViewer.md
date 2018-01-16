### Simple example

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider atCanvas={3}>
    <CanvasNavigation />
    <TileSource>
      <OpenSeadragonViewer maxHeight={500} />
    </TileSource>
  </CanvasProvider>
</Manifest>
```

