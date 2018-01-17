Annotation provider requires an `annotationList` to be provided either from a 
Provider or through its props.

The annotation provider takes an annotation and adds extra information. You get the
annotations as an array which you can loop through.

You can extract the information and display it out, no viewer required.
```js
<Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
  <CanvasProvider startCanvas={82}>
    <CanvasNavigation />  
    <AnnotationListProvider>
      <AnnotationProvider>
      { ({annotations}) => annotations.map(({ annotation, on }, key) => (
        <ul key={key}>
          <li><strong>ID:</strong> {annotation.getProperty('@id')}</li>
          <li><strong>Motivation:</strong> {annotation.getMotivation().toString()}</li>
          <li>
            <strong>On:</strong> {on.source}
            <ul>
              <li><strong>X: </strong> {on.selector.x}</li>
              <li><strong>Y: </strong> {on.selector.y}</li>
              <li><strong>Height: </strong> {on.selector.height}</li>
              <li><strong>Width: </strong> {on.selector.width}</li>
            </ul>
          </li>
        </ul>
      )) }
      </AnnotationProvider>
    </AnnotationListProvider>
  </CanvasProvider>
</Manifest>
```


Or you can you use it to compose a [CanvasRepresentation](#canvasrepresentation) and paint 
the annotations to the canvas space. 
```js
<Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
  <CanvasProvider startCanvas={82}>
    <CanvasNavigation />
    <Viewport maxWidth={500}>
      <StaticImageViewport viewportController={true} maxHeight={500} maxWidth={500} />
      <AnnotationListProvider ratio={0.1}>
       <AnnotationProvider>
        { ({annotations, ...props}) => (
         <CanvasRepresentation {...props}>
           { annotations.map(({ annotation, on }, key) => (
             <div 
               key={key} 
               x={on.selector.x} 
               y={on.selector.y} 
               height={on.selector.height} 
               width={on.selector.width} 
               style={{ border: '1px solid orange' }}
             />
            )) }
         </CanvasRepresentation>
       ) }
       </AnnotationProvider>
      </AnnotationListProvider>
    </Viewport>
  </CanvasProvider>
</Manifest>
```