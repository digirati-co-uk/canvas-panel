The range navigation provider allows you to track navigating a manifest based on a
range.

```js static
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
<Manifest jsonLd={manifests.balenciaga1}>
  <RangeNavigationProvider rangeId="https://wellcomelibrary.org/iiif/b18035723/range/illustrations">
    {({ canvas, previousRange, rangeId, currentIndex, nextRange }) => (
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
          <button onClick={nextRange}>Next</button>
        </li>
      </ul>
    )}
  </RangeNavigationProvider>
</Manifest>
```

```js
<Manifest jsonLd={manifests.balenciaga2}>
  <RangeNavigationProvider rangeId="https://wellcomelibrary.org/iiif/b18035723/range/illustrations">
    {({ canvas, previousRange, rangeId, currentIndex, nextRange }) => (
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
          <button onClick={nextRange}>Next</button>
        </li>
      </ul>
    )}
  </RangeNavigationProvider>
</Manifest>
```

```js
<Manifest jsonLd={manifests.balenciaga3}>
  <RangeNavigationProvider rangeId="https://wellcomelibrary.org/iiif/b18035723/range/illustrations">
    {({ canvas, previousRange, rangeId, region, currentIndex, nextRange }) => (
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
    )}
  </RangeNavigationProvider>
</Manifest>
```
