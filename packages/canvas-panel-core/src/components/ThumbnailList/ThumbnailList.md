### Plain thumbnail list

<style>
  .thumbnail-list {
    background: black;
  }
  
  .thumbnail-list__scroll::-webkit-scrollbar {display:none;}
  .thumbnail-list__thumb {
    border: 8px solid black;
    box-sizing: border-box;
  }
  .thumbnail-list__thumb--selected {
    border: 8px solid white;
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
            canvas={canvas}
            manifest={manifest}
            canvasList={canvasList}
            tileSize={116}
            goToRange={goToRange}
          />
        );
      }}
    </RangeNavigationProvider>
  </CanvasProvider>
</Manifest>
```

### Vertical thumbnail list

```js
<Manifest url="https://view.nls.uk/manifest/7446/74464117/manifest.json">
  <CanvasProvider startCanvas={3}>
    <RangeNavigationProvider>
      {rangeProps => {
        const { manifest, canvas, canvasList, goToRange } = rangeProps;
        return (
          <ThumbnailList
            canvas={canvas}
            manifest={manifest}
            canvasList={canvasList}
            tileSize={116}
            goToRange={goToRange}
            vertical={true}
            style={{ height: 400 }}
          />
        );
      }}
    </RangeNavigationProvider>
  </CanvasProvider>
</Manifest>
```

### Do not center selected thumbnail

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
          <>
            <p>
              <button onClick={previousRange}>Prev</button>
              <button onClick={nextRange}>Next</button>
              {canvas.id}
            </p>
            <ThumbnailList
              canvas={canvas}
              manifest={manifest}
              canvasList={canvasList}
              tileSize={116}
              goToRange={goToRange}
              centerSelected={false}
            />
          </>
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
              canvas={canvas}
              manifest={manifest}
              canvasList={canvasList}
              tileSize={116}
              goToRange={goToRange}
            />
          </div>
        );
      }}
    </RangeNavigationProvider>
  </CanvasProvider>
</Manifest>
```

### Vertical 2 columns thumbnail list

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
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <ThumbnailList
              canvas={canvas}
              manifest={manifest}
              canvasList={canvasList}
              tileSize={116}
              goToRange={goToRange}
              vertical={true}
              columns={2}
              style={{ height: 400 }}
            />
            <div
              stlye={{
                flex: 1,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 400,
                  background: 'black',
                  overflow: 'hidden',
                }}
              >
                <img
                  key={`${canvas.id}-thumnail-show`}
                  src={canvas.getCanonicalImageUri(900)}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <p>
                <button onClick={previousRange}>Prev</button>
                <button onClick={nextRange}>Next</button>
                {canvas.id}
              </p>
            </div>
          </div>
        );
      }}
    </RangeNavigationProvider>
  </CanvasProvider>
</Manifest>
```
