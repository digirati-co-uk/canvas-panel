Demo of the fullscreen component

```js
<div>
  <Fullscreen>
    {({ toggleFullscreen, exitFullscreen, goFullscreen, isFullscreen }) => (
      <div>
        <h1>Testing full screen</h1>
        <p>Lots of text</p>
        <p>Lots of text</p>
        <p>Lots of text</p>
        <span>
          {isFullscreen ? (
            <button onClick={exitFullscreen}>Exit fullscreen</button>
          ) : (
            <button onClick={goFullscreen}>Go fullscreen</button>
          )}
        </span>
      </div>
    )}
  </Fullscreen>
  <p>Not full screen</p>
  <p>Not full screen</p>
  <p>Not full screen</p>
</div>
```

### Advanced use

Fullscreen works well with other components. You can create canvas representations
that look and act differently in full screen. This is a lengthy example, but demonstrates
a more complex use case. We are also making use of the FullPageViewport in this example too,
which by default fills up all the available space.

```js
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={72}>
    <Fullscreen>
      {({
        toggleFullscreen,
        exitFullscreen,
        goFullscreen,
        isFullscreen,
        ...props
      }) => (
        <div
          style={
            isFullscreen
              ? {
                  width: '100%',
                  height: '100%',
                  padding: 10,
                  background: '#000',
                }
              : null
          }
        >
          <div
            style={isFullscreen ? { position: 'absolute', zIndex: 2 } : null}
          >
            {isFullscreen ? (
              <button onClick={exitFullscreen}>Exit fullscreen</button>
            ) : (
              <button onClick={goFullscreen}>Go fullscreen</button>
            )}
            <CanvasNavigation {...props} />
          </div>
          {isFullscreen ? (
            <SingleTileSource {...props}>
              {/* this is the view when we are in full screen */}
              <FullPageViewport interactive={true}>
                <OpenSeadragonViewport viewportController={true} />
                <AnnotationCanvasRepresentation
                  ratio={0.1}
                  annotationStyle={{ outline: '5px solid red' }}
                  growthStyle="fixed"
                />
              </FullPageViewport>
            </SingleTileSource>
          ) : (
            <SingleTileSource {...props}>
              {/* this is the view when we are not full screen */}
              <Viewport maxWidth={500}>
                <OpenSeadragonViewport
                  viewportController={true}
                  maxHeight={500}
                />
                <AnnotationCanvasRepresentation
                  ratio={0.1}
                  annotationStyle={{ outline: '2px solid blue' }}
                  growthStyle="fixed"
                />
              </Viewport>
            </SingleTileSource>
          )}
        </div>
      )}
    </Fullscreen>
  </CanvasProvider>
</Manifest>
```
