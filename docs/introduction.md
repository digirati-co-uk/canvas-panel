These components are built a variety of community plugins and concepts
to create a declarative and composable set of APIs that read IIIF resources
and display them.

This set of components is less focused on the look, layout and presentational 
aspects of IIIF Viewers, and more focused on creating a top-down data-driven
model that can be used as the functional skeleton for all IIIF experiences or
viewers.

One of the goals is to create a cookbook of skeletons that can be used as a
starting point. A representative example a cookbook entry might look like:

```jsx static
(
  <Manifest url="...">
    <CanvasProvider startCanvas={3}>
      <CanvasNavigation />
      <SingleTileSource>
        <OpenSeadragonViewer maxHeight={500} />
      </SingleTileSource>
      <MetadataPanel />
    </CanvasProvider>
  </Manifest>
)
```

From this you get all of the functionality you need to drive the IIIF resource
and can work on wrapping components to customise them:

```jsx static
function CustomCanvasNavigation(props) {
  return (
    <div className="my-navigation">
        <img src="path/to/logo.png" />
        <CanvasNavigation {...props}/>
    </div>
  );
}
```
This very simple example wraps up the canvas navigation. Which could replace the component from the cookbook:

```diff
(
  <Manifest url="...">
    <CanvasProvider startCanvas={3}>
-      <CanvasNavigation />
+      <CustomCanvasNavigation />
      ...
    </CanvasProvider>
  </Manifest>
)
```

In general, when over-riding any component you must pass through the props in order for the data to continue flowing.
This also applies when using inline JSX in components, **the following example will not work**:
```diff
(
  <Manifest url="...">
    <CanvasProvider startCanvas={3}>
+     <div className="my-wrapper">
        <CanvasNavigation />
+     </div>
      <SingleTileSource>
        <OpenSeadragonViewer maxHeight={500} />
      </SingleTileSource>
      <MetadataPanel />
    </CanvasProvider>
  </Manifest>
)
```
Since the data will be passed to the `<div>` element, instead of the navigation. One caveat that may be solved if
we change to use something like Reacts context to implicitly pass the state to all the children.