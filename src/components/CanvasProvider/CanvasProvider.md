### Minimum viable viewer
This is the absolute minimum viewer for IIIF manifest. 

```js
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider atCanvas={3}>
  {
    ({ sequence, manifest, canvas, currentCanvas, atCanvas, dispatch }) => (
        <div>
          <ul>
            <li>
              <CanvasNavigation dispatch={dispatch} />
            </li>
            <li>
              <strong>Total Sequences: </strong>
              {manifest.getTotalSequences()}
            </li>
            <li>
              <strong>At canvas: </strong>
              {atCanvas}
            </li>
            <li>
              <strong>Current canvas: </strong>
              {currentCanvas}
            </li>
            <li>
              <strong>Total canvas: </strong>
              {sequence.getTotalCanvases()}
            </li>
            <li>
              <strong>Canvas label: </strong>
              <LocaleString>{canvas.getLabel()}</LocaleString>
            </li>
            <li>
              <img src={canvas.getCanonicalImageUri(100)} />
            </li>
          </ul>
        </div>
      )
  }
  </CanvasProvider>
</Manifest>
```
