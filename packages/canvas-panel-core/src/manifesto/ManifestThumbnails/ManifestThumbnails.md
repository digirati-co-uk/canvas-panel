Returns all thumbnails from the manifest.

```js
<Manifest url="https://stephenwf.github.io/wellcome-range-test.json">
  {({ manifest }) => (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <ManifestThumbnails manifest={manifest}>
        {({ thumbnails }) =>
          Object.entries(thumbnails).map(([canvasId, thumbnail], index) => (
            <a
              href={thumbnail.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '10px',
                lineHeight: '1rem',
                fontSize: '0.8rem',
              }}
            >
              <img src={thumbnail.id} alt={canvasId} />
              {index}
            </a>
          ))
        }
      </ManifestThumbnails>
    </div>
  )}
</Manifest>
```
