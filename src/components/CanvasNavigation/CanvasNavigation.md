### Next and previous
The only controls currently

```js 
const CanvasLabel = ({canvas}) => <LocaleString>{canvas.getLabel()}</LocaleString>;
 
<Manifest url={manifests.main}>
  <CanvasProvider startCanvas={3}>
    <CanvasLabel/>
    <CanvasNavigation />
  </CanvasProvider>
</Manifest>

```
