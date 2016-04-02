# Selectable scrollable items for React

Allows individual or group selection of items using the mouse/touch.

## Demo
[Try it out](http://valerybugakov.github.io/react-selectable-fast)

## Based on react-selectable
This project is based on [react-selectable](https://github.com/unclecheese/react-selectable) by [unclecheese](https://github.com/unclecheese).
Main idea of this fork is to eliminate render during selection caused by state updates of SelectableGroup. Only items under selectbox rerender themself, which great for big lists of selectable items. Also this package extends the original functionality with ability to scroll items while selecting relative to window and specified scroll container.


## Getting started
```
npm install react-selectable-fast
```

Package exports 4 entities `{ SelectableGroup, createSelectable, SelectAll, DeselectAll }`.
To make other components selectable create selectable component with `createSelectable` function and put list of them under `SelectableGroup`.

```js
import React, { Component, PropTypes } from 'react'
import { SelectableGroup } from 'react-selectable-fast'

class App extends Component {
  ...

  render() {
    return (
      <SelectableGroup
        className="main"
        clickableClassName="tick"
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
  ...

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
* `onSelectionStart` (Function) Callback.
* `duringSelection` (Function) Callback fired rapidly during selection (while the selector is being dragged). Passes an array containing the keys of the items currently under the selector to the callback function.
* `onSelectionFinish` (Function) Callback.
* `onSelectionClear` (Function) Callback.
* `scrollContainer` (String) Selector of scroll container which will be used to calculate selectbox position. If not specified SelectableGroup element will be used as scroll container.
* `whiteList` (Array) Array of whitelisted selectors.
* `clickableClassName` (String) On element with specified selector click item cotaining this element will be selected.
* `tolerance` (Number) The amount of buffer to add around your `<SelectableGroup />` container, in pixels.
* `className` (String) Class of selectable group element.
* `selectionModeClass` (String) Class indicating that there are more than 1 selected item. Defaults to 'in-selection-mode'.
* `component` (String) The component to render. Defaults to `div`.
* `allowClickWithoutSelected` (Boolean) When disabled items can be selected by click only if there are more than 1 already selected item.
* `fixedPosition` (Boolean) Whether the `<SelectableGroup />` container is a fixed/absolute position element or the grandchild of one.
* `dontClearSelection` (Boolean) When enabled, makes all new selections add to the already selected items, except for selections that contain *only* previously selected items—in this case it unselects those items.
