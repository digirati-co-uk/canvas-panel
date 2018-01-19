[WIP]

Few assumptions:
- All viewers accept multiple annotations
- When a set of annotations come in, only one instance of each component is rendered
- In each scene that's created, theres only one controlling component (like OSD) 


`<MultipleTileSources>` - extracts all tilesources available.

To customise:

```jsx static
<SceneBuilder>
   <MissingImageService>
     <StaticImageViewer />
   </MissingImageService>
   <DeepZoom>
     <OpenSeaDragonViewer /> 
   </DeepZoom>
   <AudioVisual>
     <AVViewer /> 
   </AudioVisual>
</SceneBuilder>
```

Or use the defaults
```jsx static
<DefaultScene optionalProps=""/>
```