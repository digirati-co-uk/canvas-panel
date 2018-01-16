### Simple example

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider startCanvas={3}>
    <CanvasNavigation />
    <SingleTileSource>
      <OpenSeadragonViewer maxHeight={500} />
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```

