This viewport can be used to fill the whole screen (position fixed) or an entire container (position absolute). This can
be changed in the properties. You can also make the image non-interactive, so you can control wht the viewport shown is.

```js
<div style={{ width: '100%', height: 200, position: 'relative' }}>
  <Manifest url={manifests.main}>
    <CanvasProvider startCanvas={4}>
      <SingleTileSource>
        <FullPageViewport position="absolute" interactive={true}>
          <OpenSeadragonViewport viewportController={true}>
            <OpenSeadragonViewer maxHeight={1000} />
          </OpenSeadragonViewport>
          <CanvasRepresentation ratio={0.1}>
            <div
              y={1000}
              x={1000}
              height={500}
              width={500}
              style={{ outline: '1px solid green' }}
              onClick={() => alert('I was clicked')}
            >
              click me
            </div>
            <div
              y={2000}
              x={1000}
              height={200}
              width={500}
              style={{ outline: '1px solid green' }}
            >
              two
            </div>
            <div
              y={1000}
              x={1900}
              height={200}
              width={500}
              style={{ outline: '1px solid green' }}
            >
              three
            </div>
          </CanvasRepresentation>
        </FullPageViewport>
      </SingleTileSource>
    </CanvasProvider>
  </Manifest>
</div>
```
