# Selectable scrollable items for React

Allows individual or group selection of items using the mouse/touch.

## Demo
[Try it out](http://valerybugakov.github.io/react-selectable-fast)

## Based on react-selectable
This project is based on [react-selectable](https://github.com/unclecheese/react-selectable) by [unclecheese](https://github.com/unclecheese). It extends the original functionality in the following ways:
* Adds support for clicking individual items without dragging.
* Adds optional `dontClearSelection` feature to allow for additions to selected items.
* Adds optional `duringSelection` callback feature to allow for a callback function to be called repeatedly throughout selection.

If you are looking for a lightweight, stateless selector and don't need any of the features listed above, go with [react-selectable](https://github.com/unclecheese/react-selectable).

## Getting started
```
npm install react-selectable-fast
```

```js
import React, { Component, PropTypes } from 'react'
import { SelectableGroup } from 'react-selectable-fast'

class App extends Component {
  ...

  render() {
    return (
      <SelectableGroup
        className="main"
        clickClassName="tick"
        onSelectionStart={this.handleSelectionStart}
        duringSelection={this.handleSelecting}
        onSelectionFinish={this.handleSelectionFinish}
        onSelectionClear={this.handleSelectionClear}
        globalMouse={this.state.isGlobal}
        tolerance={this.state.tolerance}
        distance={this.state.distance}
        whiteList={['.not-selectable']}
        allowClickWithoutSelected={false}
        dontClearSelection
      >
        <List items={this.props.items} />
      </SelectableGroup>
    )
  }
}
```

```js
import React, { Component, PropTypes } from 'react'
import { createSelectable, SelectAll, DeselectAll } from 'react-selectable-fast'
import SomeComponent from './SomeComponent'

const SelectableComponent = createSelectable(SomeComponent)

class List extends Component {
  render() {
    return (
      <div>
        <SelectAll className="selectable-button">
          <button>Select all</button>
        </SelectAll>
        <DeselectAll className="selectable-button">
          <button>Clear selection</button>
        </DeselectAll>
        {this.props.items.map((item, i) => (
          <SelectableComponent
            key={i}
            title={item.title}
            year={item.year}
          />
        ))}
      </div>
    )
  }
}
```
## Configuration

The `<SelectableGroup />` component accepts a few optional props:
* `onSelection` (Function) Callback fired after user completes selection
* `duringSelection` (Function) Callback fired rapidly during selection (while the selector is being dragged). Passes an array containing the keys of the items currently under the selector to the callback function.
* `tolerance` (Number) The amount of buffer to add around your `<SelectableGroup />` container, in pixels.
* `component` (String) The component to render. Defaults to `div`.
* `fixedPosition` (Boolean) Whether the `<SelectableGroup />` container is a fixed/absolute position element or the grandchild of one.
* `dontClearSelection` (Boolean) When enabled, makes all new selections add to the already selected items, except for selections that contain *only* previously selected items—in this case it unselects those items.

*NOTE:* For both `fixedPosition` and `dontClearSelection`, if you get an error that `Value must be omitted for boolean attributes` when you try, for example, `<SelectableGroup fixedPosition={true} />`, simply use Javascript's boolean object function: `<SelectableGroup fixedPosition={Boolean(true)} />`.
