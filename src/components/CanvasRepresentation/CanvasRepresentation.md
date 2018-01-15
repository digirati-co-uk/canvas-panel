Example canvas representation with manual annotations.

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider atCanvas={4}>
    <CanvasRepresentation ratio={0.1} style={{ border: '1px solid red' }}>
      <div top={1000} left={1000} height={500} width={500} style={{ border: '1px solid green' }}>one</div>
      <div top={2000} left={1000} height={200} width={500} style={{ border: '1px solid green' }}>two</div>
      <div top={1000} left={1900} height={200} width={500} style={{ border: '1px solid green' }}>three</div>
    </CanvasRepresentation>
  </CanvasProvider>
</Manifest>
```

```js static
(
    <Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
      <CanvasProvider atCanvas={4}>
        <ViewPort width={500}>
          <ViewPort.Controller>
            <OpenSeadragon viewportController={true}/>
          </ViewPort.Controller>
          <CanvasRepresentation>
            <div top={1000} left={1000} height={500} width={500} style={{ border: '1px solid green' }}>Testing!</div>
            <div top={2000} left={1000} height={200} width={500} style={{ border: '1px solid green' }}>Testing!</div>
            <div top={1000} left={1900} height={200} width={500} style={{ border: '1px solid green' }}>Testing!</div>
          </CanvasRepresentation>
        </ViewPort>
      </CanvasProvider>
    </Manifest>
)
```