### Plain thumbnail list

<style>
  .thumbnail-list {
    position: relative;
    bottom: 0;
    left: 0;
    right: 0;
    
  }
  .thumbnail-list__scroll {
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }
  .thumbnail-list__thumb-list {
    display: flex;
  }
  .thumbnail-list__thumb {
    margin: 0;
    height: 100%;
    border: 8px solid black;
    box-sizing: border-box;
  }
  .thumbnail-list__thumb--selected {
    border: 8px solid white;
  }
  .thumbnail-list .canvas-navigation {
    display: inline-block;
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>

```js
<Manifest url="https://view.nls.uk/manifest/7446/74464117/manifest.json">
  <CanvasProvider startCanvas={3}>
    <RangeNavigationProvider>
      {rangeProps => {
        const { manifest, canvas, canvasList, goToRange } = rangeProps;
        return (
          <ThumbnailList
            currentCanvas={canvas}
            manifest={manifest}
            canvasList={canvasList}
            height={116}
            goToRange={goToRange}
          />
        );
      }}
    </RangeNavigationProvider>
  </CanvasProvider>
</Manifest>
```

### Slideshow with thumbnail list

```js
<Manifest url="https://view.nls.uk/manifest/7446/74464117/manifest.json">
  <CanvasProvider startCanvas={3}>
    <RangeNavigationProvider>
      {rangeProps => {
        const {
          manifest,
          canvas,
          canvasList,
          goToRange,
          previousRange,
          nextRange,
        } = rangeProps;
        return (
          <div>
            <div
              style={{ height: 400, background: 'black', overflow: 'hidden' }}
            >
              <img
                key={`${canvas.id}-thumnail-show`}
                src={canvas.getCanonicalImageUri(900)}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <p>
              <button onClick={previousRange}>Prev</button>
              <button onClick={nextRange}>Next</button>
              {canvas.id}
            </p>
            <ThumbnailList
              currentCanvas={canvas}
              manifest={manifest}
              canvasList={canvasList}
              height={116}
              goToRange={goToRange}
            />
          </div>
        );
      }}
    </RangeNavigationProvider>
  </CanvasProvider>
</Manifest>
```
