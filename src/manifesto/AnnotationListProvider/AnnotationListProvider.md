The annotation list provider will call its children for every annotation list, allowing you to iterate through all
of the annotations available on the manifest. It passes down props, so you can compose into CanvasRepresentations
for displaying the annotations.
```js
<Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
  <CanvasProvider startCanvas={72}>
    <AnnotationListProvider>
      { ({ annotationList }) => annotationList.getResources().map((resource, key) => ( 
        <ul key={key}>
          <li><strong>ID:</strong> {resource.getProperty('@id')}</li>
          <li><strong>Motivation:</strong> {resource.getMotivation().toString()}</li>
          <li><strong>On:</strong> {resource.getOn()}</li>
        </ul>
      ))}
    </AnnotationListProvider>
  </CanvasProvider>
</Manifest>
```