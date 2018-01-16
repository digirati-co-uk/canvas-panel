### How the components work
Loading a manifest:
```jsx static
(
    <Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
	    ...
    </Manifest>
)
```
When you use this component, much like all the other data-driven components, when they parse, load or create resources, they pass them down to their children. There are two ways to access this:

```jsx static
(
    <Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
      {({manifest}) => (
         <div>{ manifest.getDefaultLabel() }</div>
      )}
    </Manifest>
)
```

The first way is by passing a function as the children. This allows you to explicitly get the manifest variable (or whatever the module provides), and pass it down to child components as you need to.

The second way is to simple add children element:
```jsx static
class MyAwesomeComponent extends React.Component {
  render() {
    const {manifest} = this.props;
    return (
      <div>{manifest.getDefaultLabel()}</div>
    );
  }
}
(
    <Manifest url="https://iiif.riksarkivet.se/arkis!C0000263/manifest">
      <MyAwesomeComponent />
    </Manifest>
)
```
In this example, because `MyAwesomeComponent` is a direct child, it will automatically get the manifest variable.

This is a common pattern through the prototype. It allows you to create, manipulate contexts and pass them through to custom components to create UIs.