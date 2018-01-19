### Example image

Example image.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={3}>
    <SingleTileSource />
  </CanvasProvider>
</Manifest>
```

### Example tile source string

This example grabs the tile source id that can be passed down to other components like OSD viewer.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={3}>
    <SingleTileSource>
      {({ imageUri, tileSources }) => (
        <div>
          <strong>Image Uri:</strong> <a href={imageUri}>{imageUri}</a>
          <pre>{JSON.stringify(tileSources, null, 2)}</pre>
        </div>
      )}
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```

### Presentation 3 manifest

```js
<Manifest jsonLd={manifests.p3manifest}>
  <CanvasProvider startCanvas={0}>
    <SingleTileSource>
      {({ imageUri, tileSources }) => (
        <div>
          <strong>Image Uri:</strong> <a href={imageUri}>{imageUri}</a>
          <pre>{JSON.stringify(tileSources, null, 2)}</pre>
        </div>
      )}
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```

```js
<Manifest jsonLd={manifests.p3manifest}>
  <CanvasProvider startCanvas={0}>
    <SingleTileSource />
  </CanvasProvider>
</Manifest>
```
