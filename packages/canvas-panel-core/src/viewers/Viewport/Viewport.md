Viewport is how you control, or hand over control of the viewport for viewing IIIF resources.

In this example, Viewport is built as the size of the IIIF resource and scaled to fit the maxWidth. Control over the size and
position of the viewport is then passed to OpenSeadragon, so when it moves, any other layers under the viewport get
updated and sync. So the annotations in this example are follow the OpenSeadragon image.

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
        <CanvasRepresentation ratio={0.02}>
          <div
            y={1000}
            x={1000}
            height={5000}
            width={5000}
            style={{ outline: '2px solid blue' }}
            onClick={() => alert('I was clicked')}
          >
            click me
          </div>
          <div
            y={20000}
            x={10000}
            height={2000}
            width={5000}
            style={{ outline: '2px solid blue' }}
          >
            two
          </div>
          <div
            y={10000}
            x={19000}
            height={2000}
            width={5000}
            style={{ outline: '2px solid blue' }}
          >
            three
          </div>
        </CanvasRepresentation>
      </Viewport>
    </SingleTileSource>
  </CanvasProvider>
</Manifest>
```
