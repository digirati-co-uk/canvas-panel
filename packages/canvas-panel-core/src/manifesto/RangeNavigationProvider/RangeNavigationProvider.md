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
