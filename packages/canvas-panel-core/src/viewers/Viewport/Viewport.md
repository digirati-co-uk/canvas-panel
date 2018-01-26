Viewport is how you control, or hand over control of the viewport for viewing IIIF resources.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={4}>
    <SingleTileSource>
      <Viewport maxWidth={500}>
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
      </Viewport>
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```

**Important note:** All children of viewport must declare their ratio if it is to be scaled less than 1. This allows the viewport
to correctly scale content. So if you are wrapping another component that is scaled, you need to define the ratio prop.

```diff
<Viewport maxWidth={500}>
- <div>
+ <div ratio={0.1}>
    <CanvasRepresentation ratio={0.1}>
      ...
    </CanvasRepresentation>
  </div>
</Viewport>
```

### Example P3 OpenseaDragon

```js
<Manifest jsonLd={manifests.p3manifest}>
  <CanvasProvider>
    <SingleTileSource>
      <Viewport maxWidth={500}>
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
      </Viewport>
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```
