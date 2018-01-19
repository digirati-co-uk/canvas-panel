### Example with single image.

Static image viewport.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={4}>
    <Viewport maxWidth={500}>
      <StaticImageViewport
        viewportController={true}
        maxHeight={500}
        maxWidth={500}
      />
      <CanvasRepresentation ratio={0.1}>
        <div
          y={1000}
          x={1000}
          height={500}
          width={500}
          style={{ outline: '1px solid green' }}
        >
          one
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
  </CanvasProvider>
</Manifest>
```

### Example P3 manifest

```js
<Manifest jsonLd={manifests.p3manifest}>
  <CanvasProvider startCanvas={0}>
    <Viewport maxWidth={500}>
      <StaticImageViewport
        viewportController={true}
        maxHeight={500}
        maxWidth={500}
      />
    </Viewport>
  </CanvasProvider>
</Manifest>
```
