### Example with single image.
Static image viewport.

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider atCanvas={4}>
    <Viewport maxWidth={500}>
      <StaticImageViewport viewportController={true} maxHeight={500} maxWidth={500} />
      <CanvasRepresentation ratio={0.1}>
        <div top={1000} left={1000} height={500} width={500} style={{ border: '1px solid green' }}>one</div>
        <div top={2000} left={1000} height={200} width={500} style={{ border: '1px solid green' }}>two</div>
        <div top={1000} left={1900} height={200} width={500} style={{ border: '1px solid green' }}>three</div>
      </CanvasRepresentation>
    </Viewport>
  </CanvasProvider>
</Manifest>
```