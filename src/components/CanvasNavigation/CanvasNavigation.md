### Next and previous
The only controls currently

```js 
const CanvasLabel = ({canvas}) => <LocaleString>{canvas.getLabel()}</LocaleString>;
 
<Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
  <CanvasProvider startCanvas={3}>
    <CanvasLabel/>
    <CanvasNavigation />
  </CanvasProvider>
</Manifest>

```
