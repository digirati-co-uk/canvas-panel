The observable element allows you to update the props to an element from a non-react source, while still being efficient
with rendering and not throwing away the whole tree every time. This is used in plugins for custom HTML attributes that
make the plugins function like HTML web components, observing the data properties.

```js
<ObservableElement
  observer={updateState => {
    setInterval(() => updateState(state => ({ count: state.count + 1 })), 500);
  }}
  initialProps={{ count: 0 }}
  render={props => <div>Counter: {props.count}</div>}
/>
```
