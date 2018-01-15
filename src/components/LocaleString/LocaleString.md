### Locale String example
This can be used to render a translatable string from Manifesto.

```js
<Manifest url="http://wellcomelibrary.org/iiif/b18035723/manifest">
  {({ manifest }) => (
    <LocaleString>
      { manifest.getLabel() }
    </LocaleString>
  )}
</Manifest>
```
