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
      {({ imageUri, tileSource }) => (
        <div>
          <strong>Image Uri:</strong> <a href={imageUri}>{imageUri}</a>
          <pre>
          { JSON.stringify(tileSource, null, 2) }
          </pre>
        </div>
      )}
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```
