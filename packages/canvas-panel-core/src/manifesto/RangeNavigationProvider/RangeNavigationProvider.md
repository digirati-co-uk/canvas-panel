The range navigation provider allows you to track navigating a manifest based on a
range.

```js
<Manifest url="https://stephenwf.github.io/wellcome-range-test.json">
  <RangeNavigationProvider rangeId="https://wellcomelibrary.org/iiif/b18035723/range/illustrations">
    {({ canvas, previousRange, nextRange }) => (
      <div style={{ minHeight: 400 }}>
        <img key={canvas.id} src={canvas.getCanonicalImageUri(300)} />
        <p>
          <button onClick={previousRange}>Prev</button>
          {canvas.id}
          <button onClick={nextRange}>Next</button>
        </p>
      </div>
    )}
  </RangeNavigationProvider>
</Manifest>
```

## Presentation 3 examples

```js
<Manifest jsonLd={manifests.balenciaga3}>
  <RangeNavigationProvider>
    {({
      canvas,
      previousRange,
      rangeId,
      region,
      currentIndex,
      nextRange,
      ...props
    }) => (
      <div style={{ minHeight: 500 }}>
        <div style={{ minHeight: 500 }}>
          <SingleTileSource canvas={canvas} {...props}>
            <Viewport width={500} height={500}>
              <OpenSeadragonViewport viewportController={true}>
                <OpenSeadragonViewer maxHeight={500} />
              </OpenSeadragonViewport>
              {region ? (
                <CanvasRepresentation ratio={0.02}>
                  <div
                    y={region.x}
                    x={region.y}
                    height={region.height}
                    width={region.width}
                    style={{ outline: '2px solid blue' }}
                  />
                </CanvasRepresentation>
              ) : null}
            </Viewport>
          </SingleTileSource>
        </div>
        <ul>
          <li>
            <button onClick={previousRange}>Prev</button>
          </li>
          <li>
            <strong>id:</strong> {canvas.id}
          </li>
          <li>
            <strong>range:</strong> {rangeId}
          </li>
          <li>
            <strong>Index:</strong> {currentIndex}
          </li>
          <li>
            {region ? (
              <ul>
                <li>
                  <strong>x</strong> {region.x}
                </li>
                <li>
                  <strong>y</strong> {region.y}
                </li>
                <li>
                  <strong>width</strong> {region.width}
                </li>
                <li>
                  <strong>height</strong> {region.height}
                </li>
              </ul>
            ) : null}
          </li>
          <li>
            <button onClick={nextRange}>Next</button>
          </li>
        </ul>
      </div>
    )}
  </RangeNavigationProvider>
</Manifest>
```
