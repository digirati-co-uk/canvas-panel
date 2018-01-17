Example canvas representation with manual annotations.

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider startCanvas={4}>
    <CanvasRepresentation ratio={0.1} style={{ border: '1px solid red' }}>
      <div y={1000} x={1000} height={500} width={500} style={{ outline: '1px solid green' }}>one</div>
      <div y={2000} x={1000} height={200} width={500} style={{ outline: '1px solid green' }}>two</div>
      <div y={1000} x={1900} height={200} width={500} style={{ outline: '1px solid green' }}>three</div>
    </CanvasRepresentation>
  </CanvasProvider>
</Manifest>
```