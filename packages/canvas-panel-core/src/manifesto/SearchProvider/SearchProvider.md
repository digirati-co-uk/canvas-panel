Search provider example

```js
initialState = { q: 'muller', liveQ: 'muller' };
<div>
  <input
    type="text"
    value={state.liveQ}
    onChange={e => setState({ liveQ: e.currentTarget.value })}
  />
  <button onClick={() => setState({ q: state.liveQ })}>Search</button>
  <Manifest url={manifests.search}>
    <CanvasProvider startCanvas={29}>
      <CanvasNavigation />
      <Viewport maxWidth={450}>
        <SingleTileSource viewportController={true}>
          <OpenSeadragonViewport>
            <OpenSeadragonViewer maxHeight={1000} />
          </OpenSeadragonViewport>
        </SingleTileSource>
        <SearchProvider q={state.q}>
          <SearchResultsRepresentation
            annotationStyle={{ outline: '7px solid purple' }}
          />
        </SearchProvider>
      </Viewport>
    </CanvasProvider>
  </Manifest>
</div>;
```
