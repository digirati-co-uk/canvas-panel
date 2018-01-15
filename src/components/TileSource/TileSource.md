### Example image
Example image.


```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider atCanvas={3}>
    <TileSource />
  </CanvasProvider>
</Manifest>
```


### Example tile source string
This example grabs the tile source id that can be passed down to other components like OSD viewer.

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider atCanvas={3}>
    <TileSource>
      {({ imageUri, tileSource }) => (
        <div>
          <strong>Image Uri:</strong> <a href={imageUri}>{imageUri}</a>
          <pre>
          { JSON.stringify(tileSource, null, 2) }
          </pre>
        </div>
      )}
    </TileSource>
  </CanvasProvider>
</Manifest>
```
